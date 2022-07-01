import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'ThisSh0uldBCh';

const MONGO_DATABASE = process.env.MONGO_DATABASE || 'default';
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb://127.0.0.1:27017/${MONGO_DATABASE}`;

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000;

export const config = {
  jwt: {
    secret: JWT_SECRET
  },
  mongo: {
    url: MONGO_URL
  },
  server: {
    port: SERVER_PORT
  }
};
