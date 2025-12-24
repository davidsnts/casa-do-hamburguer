import { useState } from "react";
import logo from "../../public/logo.png";
import Input from "../components/Input";
import { Link } from "react-router";
import Button from "../components/Button";

const Login = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  async function handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    console.log(email);
    console.log(password);

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data);
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
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Senha"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" title="Login" />
        <Link to="/register" className="w-full">
          <Button title="Não tenho uma conta " variant="outline" />
        </Link>
      </div>
    </form>
  );
};

export default Login;
