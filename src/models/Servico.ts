import mongoose, { Schema, Document } from "mongoose";

export interface IServico extends Document {
  nome: string;
  descricao?: string;
  preco: number;
  duracao: number; // em minutos
  ativo: boolean;
  criadoEm: Date;
}

const ServicoSchema = new Schema<IServico>({
  nome: { type: String, required: true },
  descricao: { type: String },
  preco: { type: Number, required: true },
  duracao: { type: Number, required: true },
  ativo: { type: Boolean, default: true },
  criadoEm: { type: Date, default: Date.now },
});

export default mongoose.models.Servico ||
  mongoose.model<IServico>("Servico", ServicoSchema);
