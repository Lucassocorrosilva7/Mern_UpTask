import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import projectRouter from "./routes/projectRouter.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

connectDb();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "X-PINGOTHER, Content-Type, Authorization"
  );
  app.use(cors());
  next();
});

app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRouter);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Servido rodando na porta ${PORT}`);
});

import { Server } from "socket.io";
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

io.on("connection", (socket) => {
  console.log("conectado a socket.io");

  socket.on("Abrir projeto", (project) => {
    socket.join(project);
  });

  socket.on("new task", (task) => {
    const project = task.project;
    socket.to(project).emit("aggregate task", task);
  });

  socket.on("Deletar tarefa", (task) => {
    const project = task.project;
    socket.to(project).emit("Deletar tarefa", task);
  });

  socket.on("atualizar tarefa", (task) => {
    const project = task.project._id;
    socket.to(project).emit("tarefa atualizada", task);
  });

  socket.on("mudar estado", (task) => {
    const project = task.project._id;
    socket.to(project).emit("novo estado", task);
  });
});
