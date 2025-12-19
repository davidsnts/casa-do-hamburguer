import express from "express"; //padrão ecma scrypt

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.json({ msg: "Rota incial" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
