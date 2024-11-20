import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || "3000",
  mongoUri: process.env.MONGO || "mongodb://localhost:27017",
  jwt: {
    access: process.env.SECRET_JWT_ACCESS || "123",
    refresh: process.env.SECRET_JWT_REFRESH || "123",
  },
  email: process.env.EMAIL || "example@gmail.com",
  emailPassword: process.env.EMAIL_PASSWORD || "123",
};
