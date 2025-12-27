import express from "express"; //padrão ecma scrypt
import { connection } from "./src/db.js";
import cors from "cors";
import { router } from "./src/routes.js";
import cookieParser from "cookie-parser";
const app = express();

const PORT = 3000;

connection();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
