import prisma from "@/utils/prisma";

export default async function searchUserUsecase(word: string) {
  const results = await prisma.user.findMany({
    where: {
      name: {
        contains: word,
      },
    },
  });

  return results;
}
