import { NextResponse } from "next/server";
import { registrarUsuario, autenticarUsuario } from "@/controllers/User";
import "@/services/mongodb";

export async function POST(req: Request) {
  try {
    const dados = await req.json();
    const { acao } = dados;

    if (acao === "registrar") {
      const novoUsuario = await registrarUsuario(dados);
      return NextResponse.json(novoUsuario, { status: 201 });
    }

    if (acao === "login") {
      const { email, senha } = dados;
      const resultado = await autenticarUsuario(email, senha);
      return NextResponse.json(resultado, { status: 200 });
    }

    return NextResponse.json({ erro: "Ação inválida" }, { status: 400 });
  } catch (erro: any) {
    return NextResponse.json({ erro: erro.message }, { status: 500 });
  }
}
