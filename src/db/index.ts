import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_URL + "", {})
  .then(() => console.log("Database is connected"))
  .catch((error: Error) => console.log(`ERROR: ${error.message}`));
