import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import "./config/dotenv.js"; // Load environment variables

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(express.json()); // allows us to parse incoming requests:req.body

// Start server and connect to DB
app.listen(PORT, () => {
  connectDB(); // Connect to MongoDB
  console.log(`Server is running on port ${PORT}`);
});
