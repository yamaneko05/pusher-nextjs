import { z } from "zod";

export const SigninFormSchema = z.object({
  email: z
    .string()
    .email("正しい形式のメールアドレスを入力してください")
    .trim(),
  password: z
    .string()
    .min(8, { message: "8文字以上の長さにしてください" })
    .regex(/[a-zA-Z]/, { message: "1文字以上のアルファベットを含めてください" })
    .regex(/[0-9]/, { message: "1文字以上の数字を含めてください" }),
});

export const SignupFormSchema = SigninFormSchema.extend({
  name: z.string().min(1, "1文字以上の長さにしてください").trim(),
});
