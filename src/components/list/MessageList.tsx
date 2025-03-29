"use client";

import { useEffect, useRef, useState } from "react";
import MessageCard from "../card/MessageCard";
import { pusherClient } from "@/libs/pusher-client";
import { MessageForCard } from "@/utils/types";

export default function MessageList({
  messages: defaultMessages,
  chatRoomId,
}: {
  messages: MessageForCard[];
  chatRoomId: string;
}) {
  const endDiv = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(defaultMessages);

  useEffect(() => {
    const channel = pusherClient.subscribe("chat-room");
    channel.bind(chatRoomId, (message: MessageForCard) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      channel.unbind();
    };
  }, [chatRoomId]);

  useEffect(() => {
    if (endDiv.current) {
      endDiv.current.scrollIntoView();
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-scroll p-3">
      <div className="flex flex-1 flex-col gap-4">
        {messages.map((message) => (
          <MessageCard key={message.id} message={message} />
        ))}
      </div>
      <div ref={endDiv} className="gap-y-0" />
    </div>
  );
}
