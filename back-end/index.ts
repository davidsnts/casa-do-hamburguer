import express from "express"; //padrão ecma scrypt
import { connection, prisma } from "./src/db.js";
import cors from "cors";
const app = express();

const PORT = 3000;

connection();

app.use(express.json());
app.use(cors());

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: "E-mail e senha são obrigatórios.",
      });
      return;
    }

    const user = await prisma.user.findFirst({
      where: { email, password },
    });

    if (!user) {
      res.status(404).json({
        message: "Usuário não encontrado.",
      });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao criar usuário" });
    return;
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
