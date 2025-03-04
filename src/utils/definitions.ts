import { z } from "zod";

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
  name: z
    .string({ message: "入力してください" })
    .min(1, "1文字以上の長さにしてください")
    .max(16, "16文字以内の長さにしてください")
    .trim(),
});

export type SessionPayload = {
  user: {
    id: string;
    name: string;
  };
};
