import bcrypt from 'bcryptjs';

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "12", 10);

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

export const verifyPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};
