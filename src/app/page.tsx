"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        senha,
      });

      if (response.status === 200) {
        router.push("/home"); // muda pra sua rota de dashboard ou similar
      }
    } catch (err) {
      setErro("Email ou senha incorretos");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Senha"
            className="border rounded-lg p-2"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => router.push("/home")}
          >
            Entrar
            
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Não tem uma conta?{" "}
          <button
            onClick={() => router.push("/cadastro")}
            className="text-blue-600 hover:underline"
          >
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  );
}
