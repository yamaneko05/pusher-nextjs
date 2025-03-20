import { AttachmentRepository } from "@/repositories/AttachmentRepository";
import { MessageRepository } from "@/repositories/MessageRepository";
import { pusherServer } from "@/libs/pusher-server";
import { getSessionPayload } from "@/utils/session";
import { upload } from "@/utils/storage";
import { remove } from "@/utils/storage";

export class MessageService {
  constructor(private messageRepository: MessageRepository) {}

  async create(chatRoomId: string, text: string, attachments: File[]) {
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
      }),
    );

    const chatMessage = await this.messageRepository.create(
      text,
      chatRoomId,
      payload.user.id,
      paths,
    );

    await pusherServer.trigger("chat-room", chatRoomId, chatMessage);

    return chatMessage;
  }

  async delete(id: string, attachmentRepository: AttachmentRepository) {
    const attachments = await attachmentRepository.findManyByMessageId(id);

    if (attachments.length > 0) {
      const paths = attachments.map((attachment) => attachment.path);
      await remove("chat-message-attachments", paths);
    }

    await attachmentRepository.deleteManyByMessageId(id);

    await this.messageRepository.delete(id);
  }
}
