import dotenv from "dotenv";
import path from "path";
// Load environment variables
dotenv.config({ path: path.join(process.cwd(), ".env") });
export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.MONGO_URI,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_secret: process.env.JWT_ACCESS_SECRET,
  jwt_secret_IN: process.env.JWT_ACCESS_EXPIRES_IN,
};
