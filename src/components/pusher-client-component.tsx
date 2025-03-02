"use client";

import { pusherClient } from "@/utils/pusher-client";
import { useEffect, useState } from "react";

export default function PusherClientComponent() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const channel = pusherClient.subscribe("test-channel");
    channel.bind("test-event", (data: { message: string }) => {
      setMessages((prev) => [...prev, data.message]);
    });

    return () => {
      channel.unbind();
    };
  }, []);

  return (
    <>
      <div className="flex flex-col">
        {messages.map((message, i) => (
          <div key={i} className="py-2">
            {message}
          </div>
        ))}
      </div>
    </>
  );
}
