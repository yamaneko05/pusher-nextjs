import { supabase } from "./supabase";

export async function upload(
  bucketId: string,
  path: string,
  fileBody: Buffer | ArrayBuffer
) {
  const { data, error } = await supabase.storage
    .from(bucketId)
    .upload(path, fileBody);
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export function getPublicUrl(bucketId: string, path: string) {
  const { data } = supabase.storage.from(bucketId).getPublicUrl(path);
  return data.publicUrl;
}

export async function remove(bucketId: string, paths: string[]) {
  const { error } = await supabase.storage.from(bucketId).remove(paths);
  if (error) {
    throw new Error(error.message);
  }
}
