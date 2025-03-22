"use client";

import { searchUserAction } from "@/actions/user-actions";
import { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { UserForSearch } from "@/utils/types";
import UserCardForSearch from "./user-card";

export default function SearchUserCard() {
  const [word, setWord] = useState("");
  const [results, setResults] = useState<UserForSearch[]>([]);
  const [searching, setSearching] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWord = e.target.value;
    setWord(newWord);
    setSearching(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(async () => {
      const newResults = await searchUserAction(newWord);
      setResults(newResults);
      setSearching(false);
    }, 1000);
  };

  return (
    <Card className="max-w-96">
      <CardContent>
        <Input
          type="text"
          value={word}
          onChange={handleChange}
          placeholder="ユーザー名を入力して検索"
        />
        <div className="mt-4">
          <div>検索結果</div>
          <div className="mt-2 flex flex-col gap-6">
            {results.map((user) => (
              <UserCardForSearch key={user.id} user={user} />
            ))}
          </div>
          {searching && (
            <div className="mt-4 flex justify-center">
              <Loader2
                size={32}
                strokeWidth={2}
                className="animate-spin text-neutral-500"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
