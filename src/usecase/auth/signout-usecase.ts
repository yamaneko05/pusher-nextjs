import { deleteSession } from "@/utils/session";

export async function signoutUsecase() {
  await deleteSession();
}
