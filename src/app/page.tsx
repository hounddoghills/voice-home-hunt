"use client";

import { useState } from "react";
import ChoiceModal from "@/components/ui/ChoiceModal";
import VoiceSearch from "@/components/voice/VoiceSearch";
import TraditionalWidget from "@/components/search/TraditionalWidget";
import ChatInterface from "@/components/chat/ChatInterface";

export default function Home() {
  const [view, setView] = useState<"modal" | "voice" | "widget" | "chat">("modal");

  const handleChoice = (choice: "voice" | "widget" | "chat") => {
    setView(choice);
  };

  const handleSkip = () => {
    setView("widget");
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <ChoiceModal onChoice={handleChoice} onSkip={handleSkip} />
      {view === "voice" && <VoiceSearch />}
      {view === "widget" && <TraditionalWidget />}
      {view === "chat" && <ChatInterface />}
    </main>
  );
}
