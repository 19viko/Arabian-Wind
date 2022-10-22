export const FOLDER = "src/common/upload";

export const MIME_TYPES = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/gif": ".gif"
};

export const SECRET_KEY: string = process.env.secretKey || 'secretKey';
export const JWT: { secret: string; signOptions: { expiresIn: string } } = {
  secret: SECRET_KEY,
  signOptions: { expiresIn: '30d' },
};

export enum Languages {
  "RU" = 'ru',
  "EN" = 'en',
  "AR" = 'ar'
}