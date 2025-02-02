"use client";

import { useState } from "react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  createdAt: number;
}

interface ChatResponse {
  message_id: string;
  conversation_id: string;
  answer: string;
  created_at: number;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);

  /**
   * Envoie un message à l'API de chatbot.
   * @param content Le message de l'utilisateur.
   * @param analyticsData Les données analytiques à inclure dans la requête (optionnel).
   */
  const sendMessage = async (content: string, analyticsData?: string) => {
    setIsLoading(true);
    setError(null);

    // Crée un message utilisateur
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content,
      role: "user",
      createdAt: Date.now(),
    };

    // Ajoute le message utilisateur à la liste des messages
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Envoie la requête à l'API
      const response = await fetch("https://kalu.newgate-it.fr/v1/chat-messages", {
        method: "POST",
        headers: {
          Authorization: "Bearer app-1cyZP7O3mUYH7kCXlXuYOvQB",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: content,
          inputs: analyticsData || "", // Inclut les données analytiques si fournies
          response_mode: "blocking",
          conversation_id: conversationId || "", // Utilise l'ID de conversation existant ou une chaîne vide
          user: "user-123", // Identifiant utilisateur
        }),
      });

      // Vérifie si la réponse est valide
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          `API error: ${response.status}${errorData ? ` - ${JSON.stringify(errorData)}` : ''}`
        );
      }

      // Traite la réponse de l'API
      const result: ChatResponse = await response.json();

      // Met à jour l'ID de conversation si nécessaire
      if (!conversationId) {
        setConversationId(result.conversation_id);
      }

      // Crée un message assistant
      const assistantMessage: Message = {
        id: result.message_id,
        content: result.answer,
        role: "assistant",
        createdAt: result.created_at,
      };

      // Ajoute le message assistant à la liste des messages
      setMessages((prev) => [...prev, assistantMessage]);

    } catch (err) {
      // Gère les erreurs
      const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
      setError(errorMessage);
      console.error("Chat error:", err);

      // Ajoute un message d'erreur à la liste des messages
      const errorResponseMessage: Message = {
        id: crypto.randomUUID(),
        content: "Désolé, une erreur est survenue lors du traitement de votre message. Veuillez réessayer.",
        role: "assistant",
        createdAt: Date.now(),
      };

      setMessages((prev) => [...prev, errorResponseMessage]);
    } finally {
      // Termine le chargement
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
  };
}