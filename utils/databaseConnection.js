import mongoose from "mongoose";

const connectToDatabase = () => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.MongoDB_USERNAME}:${process.env.MongoDB_PASSWORD}@${process.env.MongoDB_CLUSTER}/?${process.env.MongoDB_OPTIONS}`
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch(() => console.log("Could not connect to MongoDB"));
};

export default connectToDatabase;
