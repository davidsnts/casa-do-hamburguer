import { Router } from "express";
import { login, register } from "./controller/user.controller";

const router = Router();

router.post("/login", login);

router.post("/register", register);

export { router };
