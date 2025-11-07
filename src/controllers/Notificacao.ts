import Notificacao from "../models/Notificacao";

export const criarNotificacao = async (dados: any) => {
  const { usuarioId, titulo, mensagem, tipo } = dados;

  if (!usuarioId || !titulo || !mensagem || !tipo) {
    throw new Error("Campos obrigatórios: usuarioId, titulo, mensagem e tipo.");
  }

  const novaNotificacao = await Notificacao.create({
    usuarioId,
    titulo,
    mensagem,
    tipo,
  });

  return novaNotificacao;
};

export const listarNotificacoes = async (usuarioId: string) => {
  const notificacoes = await Notificacao.find({ usuarioId }).sort({
    criadaEm: -1,
  });
  return notificacoes;
};

export const marcarComoLida = async (id: string) => {
  const notificacao = await Notificacao.findByIdAndUpdate(
    id,
    { lida: true },
    { new: true }
  );
  if (!notificacao) throw new Error("Notificação não encontrada.");
  return notificacao;
};

export const excluirNotificacao = async (id: string) => {
  const deletada = await Notificacao.findByIdAndDelete(id);
  if (!deletada) throw new Error("Notificação não encontrada.");
  return { mensagem: "Notificação excluída com sucesso." };
};
