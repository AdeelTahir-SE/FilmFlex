import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}