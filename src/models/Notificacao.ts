import mongoose, { Schema, Document } from "mongoose";

export interface INotificacao extends Document {
  usuarioId: mongoose.Types.ObjectId; // Cliente ou proprietário
  titulo: string;
  mensagem: string;
  tipo: "agendamento" | "lembrete" | "sistema"; // tipo de notificação
  lida: boolean;
  criadaEm: Date;
}

const NotificacaoSchema = new Schema<INotificacao>({
  usuarioId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  titulo: { type: String, required: true },
  mensagem: { type: String, required: true },
  tipo: {
    type: String,
    enum: ["agendamento", "lembrete", "sistema"],
    required: true,
  },
  lida: { type: Boolean, default: false },
  criadaEm: { type: Date, default: Date.now },
});

export default mongoose.models.Notificacao ||
  mongoose.model<INotificacao>("Notificacao", NotificacaoSchema);
