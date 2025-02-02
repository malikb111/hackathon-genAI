"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send } from "lucide-react";
import { useChat } from "@/hooks/use-chat";
import { cn } from "@/lib/utils";

export function ChatInterface() {
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isLoading, error, sendMessage } = useChat();

  const handleSend = async () => {
    if (message.trim()) {
      await sendMessage(message);
      setMessage("");
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          size="icon" 
          className="h-12 w-12 rounded-full shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 md:w-[400px]" 
        side="top" 
        align="end"
      >
        <div className="flex flex-col space-y-4">
          <div className="h-[300px] overflow-y-auto border rounded-md p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "mb-4 p-3 rounded-lg",
                  msg.role === "user" 
                    ? "bg-primary text-primary-foreground ml-auto max-w-[80%]" 
                    : "bg-muted max-w-[80%]"
                )}
              >
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="text-sm text-muted-foreground">
                En train d'écrire...
              </div>
            )}
            {error && (
              <div className="text-sm text-destructive">
                Erreur: {error}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Textarea
              placeholder="Écrivez votre message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[80px]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button 
              size="icon" 
              onClick={handleSend}
              className="h-[80px]"
              disabled={isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
} 