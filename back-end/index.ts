import express from "express"; //padrão ecma scrypt
import { connection, prisma } from "./src/db.js";

const app = express();
const PORT = 3000;

connection();

app.get("/", async (req, res) => {
  try {
    res.json({});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
