import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Required"),
});

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  email: z.string().email(),
  password: z.string().min(8, "Minimum 8 characters"),
});

export const profileSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  email: z.string().email(),
  age: z.string().trim().optional(),
  phoneNumber: z.string().trim().optional(),
  dlNumber: z.string().trim().optional(),
  aadharNumber: z.string().trim().optional(),
  permanentJob: z.boolean().optional(),
  employerDetails: z.string().trim().optional(),
  lastEmployerDetails: z.string().trim().optional(),
  salary: z.string().trim().optional(),
  healthInsurance: z.boolean().optional(),
  carModel: z.string().trim().optional(),
  pucExpiryDate: z.string().trim().optional(),
  jobChange: z.boolean().optional(),
});
