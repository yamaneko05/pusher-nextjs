/*
  Warnings:

  - You are about to drop the column `ownerId` on the `ChatRoom` table. All the data in the column will be lost.
  - The primary key for the `FriendRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `FriendRequest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[senderId,receiverId]` on the table `FriendRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "ChatRoom" DROP CONSTRAINT "ChatRoom_ownerId_fkey";

-- AlterTable
ALTER TABLE "ChatRoom" DROP COLUMN "ownerId";

-- AlterTable
ALTER TABLE "FriendRequest" DROP CONSTRAINT "FriendRequest_pkey",
DROP COLUMN "id";

-- CreateTable
CREATE TABLE "ChatRoomInvitation" (
    "chatRoomId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "status" "InvitationStatus" NOT NULL DEFAULT 'PENDING'
);

-- CreateTable
CREATE TABLE "_ChatRoomToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ChatRoomToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatRoomInvitation_chatRoomId_senderId_receiverId_key" ON "ChatRoomInvitation"("chatRoomId", "senderId", "receiverId");

-- CreateIndex
CREATE INDEX "_ChatRoomToUser_B_index" ON "_ChatRoomToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "FriendRequest_senderId_receiverId_key" ON "FriendRequest"("senderId", "receiverId");

-- AddForeignKey
ALTER TABLE "ChatRoomInvitation" ADD CONSTRAINT "ChatRoomInvitation_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "ChatRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatRoomInvitation" ADD CONSTRAINT "ChatRoomInvitation_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatRoomInvitation" ADD CONSTRAINT "ChatRoomInvitation_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatRoomToUser" ADD CONSTRAINT "_ChatRoomToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ChatRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatRoomToUser" ADD CONSTRAINT "_ChatRoomToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
