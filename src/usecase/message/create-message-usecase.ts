import prisma from "@/utils/prisma";
import { getSessionPayload } from "@/utils/session";
import { upload } from "@/utils/storage";

export async function createMessageUsecase(
  chatRoomId: string,
  text: string,
  attachments: File[]
) {
  const payload = await getSessionPayload();
  if (!payload) {
    throw new Error("unauthorized");
  }

  const paths = await Promise.all(
    attachments.map(async (file) => {
      const path = crypto.randomUUID() + ".webp";

      const fileBody = await file.arrayBuffer();
      await upload("chat-message-attachments", path, fileBody);

      return path;
    })
  );

  const chatMessage = await prisma.chatMessage.create({
    data: {
      text,
      chatRoomId,
      userId: payload.user.id,
      attachments: {
        create: paths.map((path) => ({ path })),
      },
    },
  });

  return chatMessage;
}
