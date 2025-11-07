"use client";

import { useRouter } from "next/navigation";
import { CalendarDays, User, LogOut } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const handleSair = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#A7E8E4] flex flex-col items-center">
      {/* Barra superior */}
      <header className="w-full bg-[#48CFCB] flex justify-between items-center px-6 py-3">
        <div className="flex items-center space-x-2">
          <div className="bg-[#F7CAC9] text-xs px-2 py-1 rounded">Logo</div>
          <span className="font-semibold text-white text-lg">Nailo</span>
        </div>
        <nav className="flex space-x-6 text-white font-medium">
          <a href="/" className="underline">Home</a>
          <a href="/agendamento" className="hover:underline">Agenda</a>
          <a href="/historico" className="hover:underline">Histórico</a>
        </nav>
        <div
          onClick={() => router.push("/perfil")}
          className="bg-white rounded-full p-2 cursor-pointer hover:scale-105 transition"
        >
          <User className="w-5 h-5 text-[#48CFCB]" />
        </div>
      </header>

      {/* Conteúdo principal */}
      <div className="flex justify-center items-center flex-1 w-full">
        <div className="bg-[#FAFAFA] rounded-2xl shadow-lg p-8 w-full max-w-md border-4 border-[#48CFCB] flex flex-col items-center">
          <h1 className="text-[#107A73] text-2xl font-semibold mb-6">
            Bem-vinda ao Nailo 💅
          </h1>

          <p className="text-gray-600 text-center mb-8">
            Aqui você pode gerenciar seus agendamentos, acompanhar o histórico e
            atualizar seu perfil com facilidade.
          </p>

          <div className="flex flex-col space-y-4 w-full">
            <button
              onClick={() => router.push("/agendamento")}
              className="flex items-center justify-center gap-2 bg-[#48CFCB] text-white py-2 rounded-full font-medium hover:bg-[#3bb3af] transition"
            >
              <CalendarDays className="w-5 h-5" /> Ver Agenda
            </button>

            <button
              onClick={() => router.push("/perfil")}
              className="flex items-center justify-center gap-2 bg-[#48CFCB] text-white py-2 rounded-full font-medium hover:bg-[#3bb3af] transition"
            >
              <User className="w-5 h-5" /> Meu Perfil
            </button>

            <button
              onClick={handleSair}
              className="flex items-center justify-center gap-2 bg-[#F7CAC9] text-[#107A73] py-2 rounded-full font-medium hover:bg-[#f3b6b5] transition"
            >
              <LogOut className="w-5 h-5" /> Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
