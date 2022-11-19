import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js"
import cors from "cors";

const app = express();

dotenv.config();

connectDb();

app.use('/api/users',userRoutes);

app.use(cors());

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Servido rodando na porta ${PORT}`);
});
