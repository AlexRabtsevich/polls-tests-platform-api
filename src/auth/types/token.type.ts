export interface ITokenPayload {
  userId: string;
  iat: number;
  exp: number;
}

export type RefreshTokenPayload = ITokenPayload;
export type AccessTokenPayload = ITokenPayload;
