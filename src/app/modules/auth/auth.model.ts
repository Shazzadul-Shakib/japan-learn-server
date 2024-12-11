import { model, Schema } from 'mongoose';
import { TRegisterWithRole } from './auth.validation';

const registerSchema = new Schema<TRegisterWithRole>({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  profile: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user', required: true },
});

export const NewUser = model<TRegisterWithRole>('User', registerSchema);
