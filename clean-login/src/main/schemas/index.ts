import { z } from 'zod'

export const SignUpSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string(),
})

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})
