"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Search, MessageCircle, X } from "lucide-react";

interface ChoiceModalProps {
  onChoice: (choice: "voice" | "widget" | "chat") => void;
  onSkip: () => void;
}

export default function ChoiceModal({ onChoice, onSkip }: ChoiceModalProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [dontAskAgain, setDontAskAgain] = useState(false);

  useEffect(() => {
    const skipChoice = localStorage.getItem("skipModalChoice");
    if (skipChoice) {
      setIsVisible(false);
      onSkip();
    }
  }, [onSkip]);

  const handleChoice = (choice: "voice" | "widget" | "chat") => {
    if (dontAskAgain) {
      localStorage.setItem("skipModalChoice", "true");
    }
    setIsVisible(false);
    setTimeout(() => onChoice(choice), 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-2xl p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl m-4"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                How would you like to search for homes?
              </h2>
              <button
                onClick={() => handleChoice("widget")}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Voice Search Option */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChoice("voice")}
                className="p-6 border-2 border-blue-200 dark:border-blue-800 rounded-xl text-left hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                  <Mic className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Voice Search
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Talk naturally and let AI find your perfect home
                </p>
              </motion.button>

              {/* Widget Search Option */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChoice("widget")}
                className="p-6 border-2 border-green-200 dark:border-green-800 rounded-xl text-left hover:border-green-500 dark:hover:border-green-500 transition-colors"
              >
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Traditional Search
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Use filters and search like you're used to
                </p>
              </motion.button>

              {/* Chat Option */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChoice("chat")}
                className="p-6 border-2 border-purple-200 dark:border-purple-800 rounded-xl text-left hover:border-purple-500 dark:hover:border-purple-500 transition-colors"
              >
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Chat with Agent
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Connect directly with your realtor
                </p>
              </motion.button>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={dontAskAgain}
                  onChange={(e) => setDontAskAgain(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Don't ask me again
                </span>
              </label>
              <span className="text-xs text-gray-400">
                Powered by Spark API
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
