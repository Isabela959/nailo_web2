"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Cadastro() {
  const router = useRouter();
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Verificação de senhas iguais antes de enviar
    if (senha !== confirmarSenha) {
      setMensagem("As senhas não coincidem!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/cadastro", {
        telefone,
        email,
        senha,
      });

      if (response.status === 201) {
        setMensagem("Cadastro realizado com sucesso!");
        setTimeout(() => router.push("/"), 1500);
      }
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-6 text-[#107A73]">
          Cadastro
        </h1>

        <form onSubmit={handleCadastro} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="E-mail"
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Telefone"
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Senha"
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirmar Senha"
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />

          {mensagem && (
            <p
              className={`text-center text-sm ${
                mensagem.includes("sucesso")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {mensagem}
            </p>
          )}

          <button
            type="submit"
            className="bg-[#48CFCB] text-white py-2 rounded-lg hover:bg-[#107A73] transition"
          >
            Cadastrar
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Já tem conta?{" "}
          <button
            onClick={() => router.push("/")}
            className="text-[#107A73] hover:underline"
          >
            Fazer login
          </button>
        </p>
      </div>
    </div>
  );
}
