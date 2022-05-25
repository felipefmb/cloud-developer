import * as bcrypt from 'bcrypt';
import { config } from '../config/config';
import { User } from '../controllers/v0/auth/models/User';
import * as jwt from 'jsonwebtoken';

export async function generatePassword(plainTextPassword: string): Promise<string> {
    const rounds : number = 10;
    const salt = await bcrypt.genSalt(rounds)
    const hash = await bcrypt.hash(plainTextPassword, salt)
    return hash;
}

export  function generateJWT(user: User): string {
    //@TODO Use jwt to create a new JWT Payload containing
    return jwt.sign(user.toJSON(), config.jwt.secret);
}

export async function comparePasswords(plainTextPassword: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hash);
}