import { AttachmentRepository } from "@/repositories/AttachmentRepository";
import { MessageRepository } from "@/repositories/MessageRepository";
import { pusherServer } from "@/libs/pusher-server";
import { storage } from "@/utils/storage";

export class MessageService {
  async create(
    userId: string,
    chatRoomId: string,
    text: string,
    attachments: File[],
  ) {
    const paths = await Promise.all(
      attachments.map(async (file) => {
        const path = crypto.randomUUID() + ".webp";

        const fileBody = await file.arrayBuffer();
        await storage.upload("chat-message-attachments", path, fileBody);

        return path;
      }),
    );

    const messageRepository = new MessageRepository();
    const chatMessage = await messageRepository.create(
      text,
      chatRoomId,
      userId,
      paths,
    );

    await pusherServer.trigger("chat-room", chatRoomId, chatMessage);

    return chatMessage;
  }

  async delete(id: string) {
    const attachmentRepository = new AttachmentRepository();
    const attachments = await attachmentRepository.findManyByMessageId(id);
    if (attachments.length > 0) {
      const paths = attachments.map((attachment) => attachment.path);
      await storage.remove("chat-message-attachments", paths);
    }
    await attachmentRepository.deleteManyByMessageId(id);

    const messageRepository = new MessageRepository();
    await messageRepository.delete(id);
  }
}
