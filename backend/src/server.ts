import mongoose from "mongoose";
import config from "./config";
import app from "./app";

async function server() {
  try {
    const conn = await mongoose.connect(config.database_url as string);

    console.log(`MongoDB connected: ${conn.connection.host}`);
    app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  } catch (error) {
    console.log("Couldn't connect to MongoDB", error);
  }
}

server().catch((error) => console.log(error));
