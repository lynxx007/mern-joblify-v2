import express from "express";
import "express-async-errors";
import morgan from "morgan";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

import jobsRouter from "./routers/jobRouter.js";
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import { connectDb } from "./config/connectDb.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

await connectDb();

var __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.static(path.resolve(__dirname, "./client/dist")));

app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/v1/jobs", authenticateUser, jobsRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);

app.use("*", notFound);
app.use(errorHandler);

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log("server is running...");
});
