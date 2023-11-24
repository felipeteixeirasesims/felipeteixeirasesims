export default {
  jwt: {
    secret: process.env.APP_KEY,
    expiresIn: '10m',
    secretRefreshToken: process.env.APP_KEY_REFRESH_TOKEN,
    expiresInRefresh: '30d',
    expiresRefreshTokenDays: 30
  }
};
