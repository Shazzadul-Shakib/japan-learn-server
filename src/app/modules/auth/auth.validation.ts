import { z } from 'zod';

// --- validation schemas --- //
export const registerSchema = z.object({
  userName: z.string().min(1, { message: 'User name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  profile: z.string().url({ message: 'Invalid URL format for profile' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(12, { message: 'Password must be less than 13 characters' }),
});

// Extract email and password types using .pick()
const emailPasswordSchema = registerSchema.pick({
  email: true,
  password: true,
});


// --- auth types --- //
export type TRegister = z.infer<typeof registerSchema>;
export type TLogin = z.infer<typeof emailPasswordSchema>;

// --- Extend the TRegister type to include the role --- //
export type TRegisterWithRole = TRegister & {
  role: string; 
};

export const authValidation = {
  registerSchema,
};
