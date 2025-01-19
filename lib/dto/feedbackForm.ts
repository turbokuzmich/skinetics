import { z } from "zod";

export const feedbackFormSchema = z
  .object({
    name: z
      .string({ required_error: "Пожалуйста, укажите имя" })
      .min(2, "Пожалуйста, укажите имя"),
    email: z.string().email("Пожалуйста, укажите корректный электронный адрес"),
    phone: z
      .string()
      .regex(
        /^\+7\s?\d{3}(?:\s|-)?\d{3}(?:\s|-)?\d{2}(?:\s|-)?\d{2}$/,
        "Пожалуйста, укажите номер телефона в формате +7 123 123 23 23"
      )
      .or(z.string().length(0)),
    message: z
      .string({ required_error: "Пожалуйста, составьте сообщение" })
      .min(10, "Пожалуйста, составьте сообщение"),
  })
  .required();

export type FeedbackForm = z.infer<typeof feedbackFormSchema>;
