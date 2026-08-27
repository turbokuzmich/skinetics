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
      .string({ required_error: "Напишите сообщение длиной не менее 10 символов." })
      .min(10, "Напишите сообщение длиной не менее 10 символов."),
  })
  .required();

export type FeedbackForm = z.infer<typeof feedbackFormSchema>;
