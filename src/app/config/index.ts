import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_url: process.env.MONGO_URI,
  secret: process.env.TOKEN_SECRET,
  salt: Number(process.env.SALT),
};
