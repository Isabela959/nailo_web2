import { NextResponse } from "next/server";
import {
  criarAgendamento,
  listarAgendamentos,
  atualizarStatus,
  excluirAgendamento,
} from "@/controllers/Agendamento";
import "@/services/mongodb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const usuarioId = searchParams.get("usuarioId");
    const tipo = searchParams.get("tipo");

    const agendamentos = await listarAgendamentos({ usuarioId, tipo });
    return NextResponse.json(agendamentos, { status: 200 });
  } catch (erro: any) {
    return NextResponse.json({ erro: erro.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const dados = await req.json();
    const agendamento = await criarAgendamento(dados);
    return NextResponse.json(agendamento, { status: 201 });
  } catch (erro: any) {
    return NextResponse.json({ erro: erro.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();
    const atualizado = await atualizarStatus(id, status);
    return NextResponse.json(atualizado, { status: 200 });
  } catch (erro: any) {
    return NextResponse.json({ erro: erro.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const resultado = await excluirAgendamento(id);
    return NextResponse.json(resultado, { status: 200 });
  } catch (erro: any) {
    return NextResponse.json({ erro: erro.message }, { status: 500 });
  }
}
