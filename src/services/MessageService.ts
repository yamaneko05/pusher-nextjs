import { AttachmentRepository } from "@/repositories/AttachmentRepository";
import { MessageRepository } from "@/repositories/MessageRepository";
import { pusherServer } from "@/libs/pusher-server";
import { getSessionPayloadOrUnauthorized } from "@/utils/session";
import { storage } from "@/utils/storage";

export class MessageService {
  constructor(private messageRepository: MessageRepository) {}

  async create(chatRoomId: string, text: string, attachments: File[]) {
    const payload = await getSessionPayloadOrUnauthorized();

    const paths = await Promise.all(
      attachments.map(async (file) => {
        const path = crypto.randomUUID() + ".webp";

        const fileBody = await file.arrayBuffer();
        await storage.upload("chat-message-attachments", path, fileBody);

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
      await storage.remove("chat-message-attachments", paths);
    }

    await attachmentRepository.deleteManyByMessageId(id);

    await this.messageRepository.delete(id);
  }
}
