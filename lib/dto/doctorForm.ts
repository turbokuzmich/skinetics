import { z } from "zod";

export const doctorFormSchema = z.object({
  name: z
    .string({ required_error: "Пожалуйста, укажите имя" })
    .min(2, "Пожалуйста, укажите имя"),
  phone: z
    .string({ required_error: "Пожалуйста, укажите номер телефона" })
    .regex(
      /^\+7\s?\d{3}(?:\s|-)?\d{3}(?:\s|-)?\d{2}(?:\s|-)?\d{2}$/,
      "Пожалуйста, укажите номер телефона в формате +7 123 123 23 23"
    ),
});

export type DoctorForm = z.infer<typeof doctorFormSchema>;
