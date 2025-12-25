import express, { type Request, type Response } from "express"; //padrão ecma scrypt
import { connection, prisma } from "./src/db.js";
import cors from "cors";
const app = express();

const PORT = 3000;

connection();

app.use(express.json());
app.use(cors());

app.post("/login", async (req: Request, res: Response) => {
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

app.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password, cep } = req.body;

    if (!name || !email || !password || !cep) {
      res
        .status(400)
        .json({ message: "Todas as informações são obrigatórias" });
      return;
    }

    const user = await prisma.user.findFirst({ where: { email } });

    if (user) {
      res.status(409).send({ msg: "E-mail já cadastrado" });
      return;
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        cep,
      },
    });

    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).json({ message: "erro no servidor." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
