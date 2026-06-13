import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// configuring the cors
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// for form data in json
app.use(express.json({ limit: "16kb" }));

// for the data from the url
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// configuration for static assets
app.use(express.static("public"));

app.use(cookieParser());

// ROUTES IMPORTS
import userRouter from "./routes/user.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

// ROUTES DECLARATION
app.use("/api/v1/users", userRouter);

// ERROR HANDLER
app.use(errorHandler);

export { app };
