import { z } from "zod";

const nameSchema = z
  .string({ message: "入力してください" })
  .min(1, "1文字以上の長さにしてください")
  .max(16, "16文字以内の長さにしてください")
  .trim();

const biographySchema = z
  .string({ message: "入力してください" })
  .max(64, "64文字以内の長さにしてください")
  .trim()
  .optional();

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
      "正しい形式のファイルを選択してください",
    ),
});

export const UpdateUserFormSchema = z.object({
  name: nameSchema,
  biography: biographySchema,
});

export const CreateChatRoomSchema = z.object({
  name: nameSchema,
  method: z.enum(["invitation", "skip"]),
  members: z.array(z.string()).min(1, "選択してください"),
});

export const UpdateRoomSchema = z.object({
  name: nameSchema,
});

export const CreateChatMessageSchema = z.object({
  text: z
    .string({ message: "テキストを入力してください" })
    .trim()
    .min(1, "1文字以上の長さにしてください")
    .max(255, "255文字以内の長さにしてください"),
  attachments: z
    .custom<FileList | File>()
    .transform(transformMultipleFileInput)
    .refine((files) => files.length <= 8, "8件以下のファイルを選択してください")
    .refine((files) => {
      return files.every((file) => {
        return file.type.match(/^image\//);
      });
    }, "正しい形式のファイルを選択してください"),
});

export function transformMultipleFileInput(input: unknown) {
  if (input === undefined) {
    return [];
  }
  if (input instanceof File) {
    if (input.size === 0) {
      return [];
    }
    return [input];
  }
  return Array.from(input as FileList);
}
