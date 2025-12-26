import { type Request, type Response } from "express";
import { prisma } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: "E-mail e senha são obrigatórios.",
      });
      return;
    }

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      res.status(401).json({
        message: "Usuário ou senha incorreta.",
      });
      return;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(401).json({
        message: "Usuário ou senha incorreta.",
      });
      return;
    }
    const userInfos = {
      name: user.name,
      email: user.email,
      id: user.id,
      cep: user.cep,
    };

    const token = jwt.sign(userInfos, process.env.JWT_SECRET!);

    res.cookie("user", token, { maxAge: 30 * 1000 });

    res.status(200).json(userInfos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao criar usuário" });
    return;
  }
};

export const register = async (req: Request, res: Response) => {
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

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        cep,
      },
    });

    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).json({ message: "erro no servidor." });
  }
};
