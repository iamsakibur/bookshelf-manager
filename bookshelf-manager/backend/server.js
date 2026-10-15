import express from "express";
import cors from "cors";
import 'dotenv/config';
import { connectDB } from "./config/db.js";
import bookRoutes from "./routes/bookRoute.js";

// Database connection
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
//Routes
app.use("/", bookRoutes)
app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
export default app;