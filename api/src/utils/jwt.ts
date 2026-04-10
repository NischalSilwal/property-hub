import jwt from 'jsonwebtoken';
import env from '../config/env';
import { JwtPayload, TokenPair } from '../interfaces/jwt';

export const generateTokenPair = (payload: JwtPayload): TokenPair => {
    const accessToken = jwt.sign({ ...payload }, env.jwt.accessSecret, {
        expiresIn: env.jwt.accessExpiresIn as jwt.SignOptions['expiresIn'],
    });

    const refreshToken = jwt.sign({ ...payload }, env.jwt.refreshSecret, {
        expiresIn: env.jwt.refreshExpiresIn as jwt.SignOptions['expiresIn'],
    });

    return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string): JwtPayload => {
    return jwt.verify(token, env.jwt.accessSecret) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
    return jwt.verify(token, env.jwt.refreshSecret) as JwtPayload;
};
