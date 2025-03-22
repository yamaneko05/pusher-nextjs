import { supabase } from "../libs/supabase";

export const storage = {
  async upload(bucketId: string, path: string, fileBody: Buffer | ArrayBuffer) {
    const { data, error } = await supabase.storage
      .from(bucketId)
      .upload(path, fileBody);
    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  async remove(bucketId: string, paths: string[]) {
    const { error } = await supabase.storage.from(bucketId).remove(paths);
    if (error) {
      throw new Error(error.message);
    }
  },

  getPublicUrl(bucketId: string, path: string) {
    const { data } = supabase.storage.from(bucketId).getPublicUrl(path);
    return data.publicUrl;
  },

  async getAll(bucketId: string) {
    const { data } = await supabase.storage.from(bucketId).list();
    return data;
  },
};
