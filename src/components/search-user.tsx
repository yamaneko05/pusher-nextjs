"use client";

import { searchUserAction } from "@/actions/user-actions";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import UserCard from "./card/user-card";
import { UserForCard } from "@/utils/types";
import UserListFallback from "./fallback/user-list-fallback";

export default function SearchUser() {
  const [word, setWord] = useState("");
  const [results, setResults] = useState<UserForCard[]>([]);
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
    }, 500);
  };

  useEffect(() => {
    (async () => {
      setSearching(true);
      const newResults = await searchUserAction("");
      setResults(newResults);
      setSearching(false);
    })();
  }, []);

  return (
    <>
      <Input
        type="text"
        value={word}
        onChange={handleChange}
        placeholder="ユーザー名を入力して検索"
      />
      <div className="mt-2">
        {searching ? (
          <UserListFallback length={5} />
        ) : (
          <>
            {results.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </>
        )}
      </div>
    </>
  );
}
