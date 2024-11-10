import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || "3000",
  mongoUri: process.env.MONGO || "mongodb://localhost:27017",
  jwtSecret: process.env.SECRET_JWT || "123",
  email: process.env.EMAIL || "example@gmail.com",
  emailPassword: process.env.EMAIL_PASSWORD || "123"
};
