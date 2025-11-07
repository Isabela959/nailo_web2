import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "seu_segredo_seguro";

export const registrarUsuario = async (dados: any) => {
  const { nome, email, senha, tipo, telefone } = dados;

  const usuarioExistente = await User.findOne({ email });
  if (usuarioExistente) {
    throw new Error("E-mail já cadastrado.");
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);
  const novoUsuario = await User.create({
    nome,
    email,
    senha: senhaCriptografada,
    tipo,
    telefone,
  });

  return novoUsuario;
};

export const autenticarUsuario = async (email: string, senha: string) => {
  const usuario = await User.findOne({ email });
  if (!usuario) throw new Error("Usuário não encontrado.");

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) throw new Error("Senha incorreta.");

  const token = jwt.sign({ id: usuario._id, tipo: usuario.tipo }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return { token, usuario };
};
