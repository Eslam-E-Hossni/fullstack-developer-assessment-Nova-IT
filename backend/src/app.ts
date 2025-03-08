import { Application } from "express";
import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routers";

const app: Application = express();

app.use(express.json()); // allows us to parse incoming requests:req.body

app.use(cors({ origin: "http://localhost:5173/", credentials: true }));

// Routes
app.use('/', router);

// Default route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to KYC API!",
  });
});

// Add this middleware before other route handlers

// error handler

export default app;
