import jwt from "jsonwebtoken";

export type TokenData = { id?: number };

export class TokenService {
  static getAccessToken = (data: TokenData) =>
    jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1d" });

  static verifyAccessToken = (token: string) =>
    jwt.verify(token, process.env.JWT_SECRET) as TokenData;
}
