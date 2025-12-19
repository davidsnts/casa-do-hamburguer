import express from "express"; //padrão ecma scrypt

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
