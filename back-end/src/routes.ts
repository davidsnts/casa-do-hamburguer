import { Router } from "express";
import { auth, login, register } from "./controller/user.controller";

const router = Router();

router.post("/login", login);

router.post("/register", register);

router.get("/me", auth);

export { router };
