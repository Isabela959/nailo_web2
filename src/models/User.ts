import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  nome: string;
  email: string;
  senha: string;
  tipo: "cliente" | "proprietario"; // controle de acesso
  telefone?: string;
  criadoEm: Date;
}

const UserSchema = new Schema<IUser>({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  tipo: { type: String, enum: ["cliente", "proprietario"], required: true },
  telefone: { type: String },
  criadoEm: { type: Date, default: Date.now },
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
