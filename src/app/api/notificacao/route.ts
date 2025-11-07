import { NextResponse } from "next/server";
import {
  criarNotificacao,
  listarNotificacoes,
  marcarComoLida,
  excluirNotificacao,
} from "@/controllers/Notificacao";
import "@/services/mongodb";

// Listar notificações de um usuário
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const usuarioId = searchParams.get("usuarioId");

    if (!usuarioId) {
      return NextResponse.json(
        { erro: "Informe o usuarioId" },
        { status: 400 }
      );
    }

    const notificacoes = await listarNotificacoes(usuarioId);
    return NextResponse.json(notificacoes, { status: 200 });
  } catch (erro: any) {
    return NextResponse.json({ erro: erro.message }, { status: 500 });
  }
}

// Criar nova notificação
export async function POST(req: Request) {
  try {
    const dados = await req.json();
    const nova = await criarNotificacao(dados);
    return NextResponse.json(nova, { status: 201 });
  } catch (erro: any) {
    return NextResponse.json({ erro: erro.message }, { status: 500 });
  }
}

// Marcar como lida
export async function PUT(req: Request) {
  try {
    const { id } = await req.json();
    const atualizada = await marcarComoLida(id);
    return NextResponse.json(atualizada, { status: 200 });
  } catch (erro: any) {
    return NextResponse.json({ erro: erro.message }, { status: 500 });
  }
}

// Excluir notificação
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const resultado = await excluirNotificacao(id);
    return NextResponse.json(resultado, { status: 200 });
  } catch (erro: any) {
    return NextResponse.json({ erro: erro.message }, { status: 500 });
  }
}
