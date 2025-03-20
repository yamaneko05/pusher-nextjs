import {
  LucideMessagesSquare,
  LucidePlusSquare,
  LucideUserSearch,
} from "lucide-react";

export const navItems = [
  {
    path: "/chat-rooms",
    name: "全てのチャットルーム",
    icon: <LucideMessagesSquare className="size-6" />,
  },
  {
    path: "/chat-rooms/create",
    name: "新しいチャットルームを作成",
    icon: <LucidePlusSquare className="size-6" />,
  },
  {
    path: "/users",
    name: "ユーザー検索",
    icon: <LucideUserSearch className="size-6" />,
  },
];
