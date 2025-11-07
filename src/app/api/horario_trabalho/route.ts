import { NextResponse } from "next/server";
import {
  salvarHorario,
  listarHorarios,
  excluirHorario,
} from "@/controllers/Horario_trabalho";
import "@/services/mongodb";

// Listar horários do proprietário
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

    const horarios = await listarHorarios(usuarioId);
    return NextResponse.json(horarios, { status: 200 });
  } catch (erro: any) {
    return NextResponse.json({ erro: erro.message }, { status: 500 });
  }
}

// Criar ou atualizar horário
export async function POST(req: Request) {
  try {
    const dados = await req.json();
    const resultado = await salvarHorario(dados);
    return NextResponse.json(resultado, { status: 201 });
  } catch (erro: any) {
    return NextResponse.json({ erro: erro.message }, { status: 500 });
  }
}

// Excluir horário
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const resultado = await excluirHorario(id);
    return NextResponse.json(resultado, { status: 200 });
  } catch (erro: any) {
    return NextResponse.json({ erro: erro.message }, { status: 500 });
  }
}
