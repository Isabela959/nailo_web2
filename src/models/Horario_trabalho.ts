import mongoose, { Schema, Document } from "mongoose";

export interface IHorarioTrabalho extends Document {
  usuarioId: mongoose.Types.ObjectId; // proprietário
  diaSemana: string; // ex: "segunda", "terça"...
  inicio: string; // ex: "08:00"
  fim: string; // ex: "17:00"
  ativo: boolean; // se o dia está ativo ou não
  criadoEm: Date;
}

const HorarioTrabalhoSchema = new Schema<IHorarioTrabalho>({
  usuarioId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  diaSemana: {
    type: String,
    enum: [
      "domingo",
      "segunda",
      "terça",
      "quarta",
      "quinta",
      "sexta",
      "sábado",
    ],
    required: true,
  },
  inicio: { type: String, required: true },
  fim: { type: String, required: true },
  ativo: { type: Boolean, default: true },
  criadoEm: { type: Date, default: Date.now },
});

export default mongoose.models.HorarioTrabalho ||
  mongoose.model<IHorarioTrabalho>("HorarioTrabalho", HorarioTrabalhoSchema);
