import { NextResponse } from "next/server";
import {
  criarServico,
  listarServicos,
  atualizarServico,
  excluirServico,
} from "@/controllers/Servico";
import "@/services/mongodb";

// Criar e listar serviços
export async function GET() {
  try {
    const servicos = await listarServicos();
    return NextResponse.json(servicos, { status: 200 });
  } catch (erro: any) {
    return NextResponse.json({ erro: erro.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const dados = await req.json();
    const novoServico = await criarServico(dados);
    return NextResponse.json(novoServico, { status: 201 });
  } catch (erro: any) {
    return NextResponse.json({ erro: erro.message }, { status: 500 });
  }
}

// Atualizar serviço
export async function PUT(req: Request) {
  try {
    const dados = await req.json();
    const { id, ...atualizacoes } = dados;

    const servicoAtualizado = await atualizarServico(id, atualizacoes);
    return NextResponse.json(servicoAtualizado, { status: 200 });
  } catch (erro: any) {
    return NextResponse.json({ erro: erro.message }, { status: 500 });
  }
}

// Excluir serviço
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const resultado = await excluirServico(id);
    return NextResponse.json(resultado, { status: 200 });
  } catch (erro: any) {
    return NextResponse.json({ erro: erro.message }, { status: 500 });
  }
}
