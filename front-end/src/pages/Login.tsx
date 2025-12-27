import { useContext, useState } from "react";
import logo from "../../public/logo.png";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router";
import Button from "../components/Button";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);
  console.log(document.cookie);

  async function handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();

    try {
      if (!email || !password) {
        setError("E-mail e senha são obrigatórios");
        return;
      }
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.status === 404 || response.status === 401) {
        setError("Usuário ou senha incorreta");
        return;
      }

      if (response.status === 400) {
        setError("Usuário e senha são obrigatórios");
        return;
      }

      if (response.status === 200) {
        setError("");
        const data = await response.json();
        setUser(data);
        navigate("/");
      }
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
      <div className="flex flex-col justify-center gap-2">
        <Link to="/">
          <img src={logo} alt="" className="mx-auto mb-4" />
        </Link>
        <div className="mb-3 flex flex-col gap-2">
          <Input
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <Input
            placeholder="Senha"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-left text-sm font-bold text-red-500">{error}</p>
        </div>
        <Button type="submit" title="Login" />
        <Link to="/register" className="w-full">
          <Button title="Não tenho uma conta " variant="outline" />
        </Link>
      </div>
    </form>
  );
};

export default Login;
