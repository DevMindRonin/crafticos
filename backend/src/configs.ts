// backend/config.ts
const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Missing environment variable: ${key}`);
  }
  return value;
};

export const config = {
  FRONTEND_PORT: getEnvVar("FRONTEND_PORT"),
  BACKEND_PORT: getEnvVar("BACKEND_PORT"),
  DATABASE_URL: getEnvVar("DATABASE_URL"),
  JWT_SECRET: getEnvVar("JWT_SECRET"),
};
