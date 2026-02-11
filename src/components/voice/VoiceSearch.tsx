"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Square } from "lucide-react";

export default function VoiceSearch() {
  const [isListening, setIsListening] = useState(false);
  const [conversation, setConversation] = useState<Array<{
    role: "user" | "assistant";
    content: string;
  }>>([
    {
      role: "assistant",
      content: "What are you looking for today?",
    },
  ]);

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            🎙️ Voice Search
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-col items-center gap-6 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleListening}
            className={`w-24 h-24 rounded-full shadow-xl flex items-center justify-center transition-all ${
              isListening 
                ? "bg-red-500 hover:bg-red-600" 
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
          >
            {isListening ? (
              <Square className="w-10 h-10 fill-current" />
            ) : (
              <Mic className="w-10 h-10" />
            )}
          </motion.button>
          
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {isListening ? "Listening... Tap to stop" : "Tap to start talking"}
          </p>
        </div>

        <div className="space-y-4">
          {conversation.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  message.role === "user"
                    ? "bg-blue-500 text-white rounded-br-md"
                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-md shadow-md"
                }`}
              >
                {message.content}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
