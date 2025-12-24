import express from "express"; //padrão ecma scrypt
import { connection, prisma } from "./src/db.js";
import { use } from "react";
import { json } from "node:stream/consumers";
import cors from "cors";
const app = express();

const PORT = 3000;

connection();

app.use(express.json());
app.use(cors());

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({
      where: { email, password },
    });

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
