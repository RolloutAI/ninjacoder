"use client";

import { VercelV0Chat } from "@/components/ui/v0-ai-chat";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <VercelV0Chat />
    </main>
  );
}