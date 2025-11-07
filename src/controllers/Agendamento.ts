import Agendamento from "../models/Agendamento";
import Notificacao from "../models/Notificacao"; // para enviar notificações automáticas

// Criar agendamento
export const criarAgendamento = async (dados: any) => {
  const { clienteId, profissionalId, servicoId, data, hora, observacao } =
    dados;

  if (!clienteId || !profissionalId || !servicoId || !data || !hora) {
    throw new Error(
      "Campos obrigatórios: clienteId, profissionalId, servicoId, data e hora."
    );
  }

  // Verificar conflito de horário
  const conflito = await Agendamento.findOne({
    profissionalId,
    data,
    hora,
    status: { $ne: "cancelado" },
  });

  if (conflito) {
    throw new Error("Horário indisponível para esse profissional.");
  }

  const agendamento = await Agendamento.create({
    clienteId,
    profissionalId,
    servicoId,
    data,
    hora,
    observacao,
  });

  // Cria notificação para o profissional
  await Notificacao.create({
    usuarioId: profissionalId,
    titulo: "Novo agendamento!",
    mensagem: `Você tem um novo agendamento em ${data} às ${hora}.`,
  });

  return agendamento;
};

// Listar agendamentos (pode ser de cliente ou profissional)
export const listarAgendamentos = async (filtro: any) => {
  const { usuarioId, tipo } = filtro; // tipo = "cliente" ou "profissional"

  if (!usuarioId || !tipo) {
    throw new Error("Informe o usuarioId e o tipo (cliente ou profissional).");
  }

  const campo = tipo === "cliente" ? "clienteId" : "profissionalId";

  const agendamentos = await Agendamento.find({ [campo]: usuarioId })
    .populate("servicoId")
    .populate("clienteId")
    .populate("profissionalId")
    .sort({ data: 1, hora: 1 });

  return agendamentos;
};

// Atualizar status do agendamento
export const atualizarStatus = async (id: string, status: string) => {
  if (!["pendente", "confirmado", "concluido", "cancelado"].includes(status)) {
    throw new Error("Status inválido.");
  }

  const agendamento = await Agendamento.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!agendamento) throw new Error("Agendamento não encontrado.");

  // Notificação automática
  await Notificacao.create({
    usuarioId: agendamento.clienteId,
    titulo: "Atualização de agendamento",
    mensagem: `Seu agendamento foi ${status}.`,
  });

  return agendamento;
};

// Excluir agendamento
export const excluirAgendamento = async (id: string) => {
  const deletado = await Agendamento.findByIdAndDelete(id);
  if (!deletado) throw new Error("Agendamento não encontrado.");
  return { mensagem: "Agendamento excluído com sucesso." };
};
