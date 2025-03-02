import bcrypt from "bcryptjs";

export function encryptPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}
