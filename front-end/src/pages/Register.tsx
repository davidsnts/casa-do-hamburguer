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

  function handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    console.log({ nome, email, password, confirmPassword, cep });
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
        <Input placeholder="Nome" onChange={(e) => setNome(e.target.value)} />

        <Input
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Senha"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          placeholder="Confirme sua senha"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Input
          placeholder="CEP"
          type="text"
          onChange={(e) => setCep(e.target.value)}
        />

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
    </form>
  );
};

export default Register;
