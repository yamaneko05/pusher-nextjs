"use client";

import { useEffect, useRef } from "react";
import ChatMessageCard from "./chat-message-card";
import { ChatMessageWithUser } from "@/utils/prisma-validator";

export default function ChatMessageList({
  chatMessages,
}: {
  chatMessages: ChatMessageWithUser[];
}) {
  const endDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endDiv.current) {
      endDiv.current.scrollIntoView();
    }
  }, [chatMessages]);

  return (
    <div className="flex-1 overflow-y-scroll p-3">
      <div className="flex-1 flex flex-col gap-4">
        {chatMessages.map((chatMessage) => (
          <ChatMessageCard key={chatMessage.id} chatMessage={chatMessage} />
        ))}
      </div>
      <div ref={endDiv} className="gap-y-0" />
    </div>
  );
}
