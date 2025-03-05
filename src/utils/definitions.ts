import { z } from "zod";

const nameSchema = z
  .string({ message: "入力してください" })
  .min(1, "1文字以上の長さにしてください")
  .max(16, "16文字以内の長さにしてください")
  .trim();

export const SigninFormSchema = z.object({
  email: z
    .string({ message: "入力してください" })
    .email("正しい形式のメールアドレスを入力してください")
    .trim(),
  password: z
    .string({ message: "入力してください" })
    .min(8, { message: "8文字以上の長さにしてください" })
    .regex(/[a-zA-Z]/, { message: "1文字以上のアルファベットを含めてください" })
    .regex(/[0-9]/, { message: "1文字以上の数字を含めてください" }),
});

export const SignupFormSchema = SigninFormSchema.extend({
  name: nameSchema,
  image: z
    .instanceof(File, { message: "選択してください" })
    .refine(
      (file) => file.type.match(/^image\//),
      "正しい形式のファイルを選択してください"
    ),
});

export type SessionPayload = {
  user: {
    id: string;
    name: string;
    image: string | null;
  };
};

export const CreateChatRoomSchema = z.object({
  name: nameSchema,
});

export const CreateChatMessageSchema = z.object({
  text: z
    .string({ message: "入力してください" })
    .min(1, "1文字以上の長さにしてください")
    .max(255, "255文字以内の長さにしてください")
    .trim(),
});
