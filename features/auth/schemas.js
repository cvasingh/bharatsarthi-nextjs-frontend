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
  fullName: z.string().trim().min(1, "Required"),
  email: z.string().email(),
  phoneNumber: z.string().trim().min(1, "Required"),
  location: z.string().trim().min(1, "Required"),
  postalCode: z.string().trim().min(1, "Required"),
});
