import HorarioTrabalho from "../models/Horario_trabalho";

// Criar ou atualizar horário de um dia específico
export const salvarHorario = async (dados: any) => {
  const { usuarioId, diaSemana, inicio, fim, ativo } = dados;

  if (!usuarioId || !diaSemana || !inicio || !fim) {
    throw new Error("Campos obrigatórios: usuarioId, diaSemana, inicio e fim.");
  }

  const horarioExistente = await HorarioTrabalho.findOne({
    usuarioId,
    diaSemana,
  });

  if (horarioExistente) {
    // Atualiza o horário existente
    const atualizado = await HorarioTrabalho.findByIdAndUpdate(
      horarioExistente._id,
      { inicio, fim, ativo },
      { new: true }
    );
    return atualizado;
  } else {
    // Cria novo registro
    const novo = await HorarioTrabalho.create({
      usuarioId,
      diaSemana,
      inicio,
      fim,
      ativo,
    });
    return novo;
  }
};

// Listar horários de um usuário (geralmente o proprietário)
export const listarHorarios = async (usuarioId: string) => {
  const horarios = await HorarioTrabalho.find({ usuarioId }).sort({
    criadoEm: 1,
  });
  return horarios;
};

// Excluir um horário de trabalho específico
export const excluirHorario = async (id: string) => {
  const deletado = await HorarioTrabalho.findByIdAndDelete(id);
  if (!deletado) throw new Error("Horário não encontrado.");
  return { mensagem: "Horário excluído com sucesso." };
};
