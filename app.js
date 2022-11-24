import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import projectRouter from "./routes/projectRouter.js";

const app = express();
app.use(express.json());

dotenv.config();

connectDb();

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRouter);

app.use(cors());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servido rodando na porta ${PORT}`);
});
