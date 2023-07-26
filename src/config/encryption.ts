import bcrypt from "bcryptjs";

const SALT_ROUNDS = Number(process.env.PASSWORD_SALT_ROUNDS);

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hasedPass = await bcrypt.hash(password, salt);
    return hasedPass;
};

export const comparePassword = async (password: string, hash: string) =>
    await bcrypt.compare(password, hash);