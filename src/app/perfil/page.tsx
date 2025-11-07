"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User, LogOut, Edit } from "lucide-react";
import Link from "next/link";

export default function PerfilPage() {
  const router = useRouter();
  const [usuario] = useState({
    nome: "Nome do Usuário",
    telefone: "(11) 99999-9999",
  });

  const handleLogout = () => {
    alert("Você saiu da conta!");
    router.push("/login");
  };

  const handleEdit = () => {
    router.push("/editar-perfil");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--verde-agua-suave)]">
      {/* Cabeçalho */}
      <header className="header justify-between">
        <div className="flex items-center">
          <div className="logo">Logo</div>
          <span className="ml-2 font-semibold text-[var(--verde-escuro)]">Nailo</span>
        </div>

        <nav className="flex space-x-6 font-medium text-[var(--off-white)]">
          <Link href="/home" className="hover:underline">Home</Link>
          <Link href="/agenda" className="hover:underline">Agenda</Link>
          <Link href="/historico" className="hover:underline">Histórico</Link>
        </nav>

        <div className="bg-[var(--off-white)] rounded-full p-2">
          <User className="w-5 h-5 text-[var(--verde-escuro)]" />
        </div>
      </header>

      {/* Card de perfil */}
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-[var(--off-white)] p-8 rounded-xl shadow-md w-80 text-center border-4 border-[var(--verde-jade)]">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-3">
              <User className="w-10 h-10 text-gray-500" />
            </div>
            <p className="font-semibold text-gray-800">{usuario.nome}</p>
            <p className="text-gray-600">{usuario.telefone}</p>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={handleEdit}
              className="bg-[var(--verde-jade)] text-white py-2 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#3bb9b4] transition"
            >
              <Edit className="w-4 h-4" />
              Editar
            </button>
            <button
              onClick={handleLogout}
              className="bg-[var(--verde-escuro)] text-white py-2 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#0d615c] transition"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
