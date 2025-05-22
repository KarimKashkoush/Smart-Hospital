export type ENV = {
  DATABASE_URL: string;
  PORT: string;
  JWT_SECRET: string;
  ADMIN_USERNAME: string;
  ADMIN_PASSWORD: string;
};

export const env: ENV = {
  DATABASE_URL: process.env.DATABASE_URL!,
  PORT: process.env.PORT!,
  JWT_SECRET: process.env.JWT_SECRET!,
  ADMIN_USERNAME: process.env.ADMIN_USERNAME!,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD!,
};
