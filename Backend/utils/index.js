import bcrypt from "bcrypt"
export const hashPayload = async (data) => {
  return await bcrypt.hash(data, 12);
};
export const comparePasswords = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword)
}