import mongoose, { Schema, Document } from "mongoose";

export interface IAgendamento extends Document {
  clienteId: mongoose.Types.ObjectId;
  profissionalId: mongoose.Types.ObjectId;
  servicoId: mongoose.Types.ObjectId;
  data: string; // ex: "2025-11-08"
  hora: string; // ex: "14:30"
  status: "pendente" | "confirmado" | "concluido" | "cancelado";
  observacao?: string;
  criadoEm: Date;
}

const AgendamentoSchema = new Schema<IAgendamento>({
  clienteId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  profissionalId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  servicoId: { type: Schema.Types.ObjectId, ref: "Servico", required: true },
  data: { type: String, required: true },
  hora: { type: String, required: true },
  status: {
    type: String,
    enum: ["pendente", "confirmado", "concluido", "cancelado"],
    default: "pendente",
  },
  observacao: { type: String },
  criadoEm: { type: Date, default: Date.now },
});

export default mongoose.models.Agendamento ||
  mongoose.model<IAgendamento>("Agendamento", AgendamentoSchema);
