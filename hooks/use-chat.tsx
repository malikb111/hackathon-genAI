import { useState, useCallback, useRef, useEffect } from "react";
import { useFetchData } from "./use-fetch-data";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface StreamResponse {
  event: string;
  message_id?: string;
  conversation_id?: string;
  answer?: string;
  metadata?: {
    usage?: {
      total_tokens: number;
      total_price: string;
      currency: string;
    };
  };
}

const API_URL = "https://kalu.newgate-it.fr/v1";
const API_KEY = "app-LeWCmjijyAO3vu2XNizfGGyd";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const conversationIdRef = useRef<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const { data } = useFetchData();
  console.log(data);
  const processStreamResponse = useCallback((data: StreamResponse) => {
    switch (data.event) {
      case "message":
        const answer = data.answer;
        if (!answer) return;

        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage?.role === "assistant") {
            return [
              ...prev.slice(0, -1),
              { ...lastMessage, content: lastMessage.content + answer },
            ];
          }
          return [
            ...prev,
            {
              id: data.message_id || Date.now().toString(),
              content: answer,
              role: "assistant",
              timestamp: new Date(),
            },
          ];
        });
        break;
      case "error":
        setError(
          "Une erreur est survenue lors de la communication avec l'assistant."
        );
        setIsLoading(false);
        break;
      case "message_end":
        setIsLoading(false);
        if (data.conversation_id) {
          conversationIdRef.current = data.conversation_id;
        }
        break;
    }
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || !API_KEY) return;

      // Annuler la requête précédente si elle existe
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const userMessage: Message = {
        id: Date.now().toString(),
        content,
        role: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      abortControllerRef.current = new AbortController();

      try {
        const requestBody = {
          inputs: {
            param: JSON.stringify(
              data.map((item) => ({
                ...item,
                sujet_gen: undefined,
                typologie: undefined,
              }))
            ),
          },
          query: content,
          response_mode: "streaming",
          conversation_id: conversationIdRef.current || "",
          user: "web-user",
        };

        const response = await fetch(`${API_URL}/chat-messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify(requestBody),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error("Erreur de communication avec l'API");
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("Impossible de lire la réponse");

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.trim() && line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.slice(6));
                processStreamResponse(data);
              } catch (e) {
                console.error("Erreur de parsing JSON:", e);
              }
            }
          }
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          console.log("Requête annulée");
        } else {
          setError("Une erreur est survenue lors de l'envoi du message.");
          console.error("Erreur:", err);
        }
        setIsLoading(false);
      }
    },
    [processStreamResponse]
  );

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
  };
}
