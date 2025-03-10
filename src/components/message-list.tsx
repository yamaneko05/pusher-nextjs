"use client";

import { useEffect, useRef, useState } from "react";
import MessageCard from "./message-card";
import { MessageValidator } from "@/utils/prisma-validator";
import { pusherClient } from "@/utils/pusher-client";

export default function MessageList({
  messages: defaultMessages,
  chatRoomId,
}: {
  messages: MessageValidator[];
  chatRoomId: string;
}) {
  const endDiv = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(defaultMessages);

  useEffect(() => {
    const channel = pusherClient.subscribe("chat-room");
    channel.bind(chatRoomId, (message: MessageValidator) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      channel.unbind();
    };
  }, []);

  useEffect(() => {
    if (endDiv.current) {
      endDiv.current.scrollIntoView();
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-scroll p-3">
      <div className="flex-1 flex flex-col gap-4">
        {messages.map((message) => (
          <MessageCard key={message.id} message={message} />
        ))}
      </div>
      <div ref={endDiv} className="gap-y-0" />
    </div>
  );
}
