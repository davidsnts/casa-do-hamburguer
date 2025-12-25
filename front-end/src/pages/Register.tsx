import { useState } from "react";
import logo from "../../public/logo.png";
import Input from "../components/Input";
import { Link } from "react-router";
import Button from "../components/Button";

const Register = () => {
  const [nome, setNome] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [cep, setCep] = useState<string>();
  const [msg, setMsg] = useState<string>();

  async function handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nome, email, password, cep }),
      });

      if (response.status !== 201) {
        const { msg, message } = await response.json();
        setMsg(msg || message);
        return;
      }

      if (password !== confirmPassword) {
        setMsg("As senhas devem ser iguais");
        return;
      }

      setMsg("");
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-screen items-center justify-center bg-[#161410]"
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <Link to="/">
          <img src={logo} alt="" className="mb-4" />
        </Link>
        <Input
          placeholder="Nome"
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <Input
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          placeholder="Senha"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Input
          placeholder="Confirme sua senha"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <Input
          placeholder="CEP"
          type="text"
          onChange={(e) => setCep(e.target.value)}
          required
        />
        <span className="w-full font-bold text-red-500">{msg}</span>
        <div className="mt flex w-full flex-col gap-2">
          <Button
            type="submit"
            className="w-full cursor-pointer rounded-md bg-[#c92A0E] py-2 text-sm font-bold text-white"
            title={"Criar conta"}
          />
          <Link to="/login" className="w-full">
            <Button
              className="w-full cursor-pointer rounded-md bg-[#c92A0E] py-2 text-sm font-bold text-white"
              title={"Já tenho uma conta"}
              variant="outline"
            >
              Já tenho uma conta
            </Button>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Register;
