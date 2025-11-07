import Servico from "../models/Servico";

export const criarServico = async (dados: any) => {
  const { nome, descricao, preco, duracao } = dados;

  if (!nome || !preco || !duracao) {
    throw new Error("Campos obrigatórios: nome, preço e duração.");
  }

  const novoServico = await Servico.create({
    nome,
    descricao,
    preco,
    duracao,
  });

  return novoServico;
};

export const listarServicos = async () => {
  const servicos = await Servico.find({ ativo: true }).sort({ nome: 1 });
  return servicos;
};

export const atualizarServico = async (id: string, dados: any) => {
  const servicoAtualizado = await Servico.findByIdAndUpdate(id, dados, {
    new: true,
  });
  if (!servicoAtualizado) throw new Error("Serviço não encontrado.");
  return servicoAtualizado;
};

export const excluirServico = async (id: string) => {
  const servicoExcluido = await Servico.findByIdAndDelete(id);
  if (!servicoExcluido) throw new Error("Serviço não encontrado.");
  return { mensagem: "Serviço excluído com sucesso!" };
};
