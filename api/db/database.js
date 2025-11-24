import { mongoose } from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("Database Connection Error", err);
  }
};

export default connectDb;
