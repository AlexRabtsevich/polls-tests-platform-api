export enum JwtStrategy {
  AccessToken = 'accessToken',
  RefreshToken = 'refreshToken',
}

export enum JwtSecretKey {
  AccessToken = 'ACCESS_TOKEN_SECRET_KEY',
  RefreshToken = 'REFRESH_TOKEN_SECRET_KEY',
}

export enum JwtExpiresIn {
  AccessToken = 'ACCESS_TOKEN_EXPIRES_IN',
  RefreshToken = 'REFRESH_TOKEN_EXPIRES_IN',
}
