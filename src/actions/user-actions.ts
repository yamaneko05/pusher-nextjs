"use server";

import searchUserUsecase from "@/usecase/user/search-user-usecase";

export async function searchUserAction(word: string) {
  const results = searchUserUsecase(word);

  return results;
}
