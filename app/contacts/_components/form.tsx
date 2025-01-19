"use client";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { reachGoalForm } from "@/lib/metrika";
import { feedbackFormSchema, type FeedbackForm } from "@/lib/dto/feedbackForm";

const defaultFormValues: FeedbackForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function FeedbackForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { formState, register, handleSubmit } = useForm<FeedbackForm>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(feedbackFormSchema),
  });

  const onSubmit = useCallback(
    async (values: FeedbackForm) => {
      await fetch("/api/feedback", {
        body: JSON.stringify(values),
        headers: {
          "content-type": "application/json",
        },
        method: "PUT",
      });

      reachGoalForm();
      setIsSubmitted(true);
    },
    [setIsSubmitted]
  );

  return isSubmitted ? (
    <Typography padding={4}>Мы свяжемся с вами в ближайшее время</Typography>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} padding={4} useFlexGap>
        <Typography variant="h5">Напишите нам</Typography>
        <TextField
          variant="outlined"
          placeholder="Ваше имя"
          error={Boolean(formState.errors.name)}
          helperText={formState.errors.name?.message}
          {...register("name")}
        />
        <TextField
          variant="outlined"
          placeholder="Ваш электронный адрес"
          error={Boolean(formState.errors.email)}
          helperText={formState.errors.email?.message}
          {...register("email")}
        />
        <TextField
          variant="outlined"
          placeholder="Номер телефона (например, +7 123 123 23 45)"
          error={Boolean(formState.errors.phone)}
          helperText={formState.errors.phone?.message}
          {...register("phone")}
        />
        <TextField
          variant="outlined"
          placeholder="Ваше сообщение"
          error={Boolean(formState.errors.message)}
          helperText={formState.errors.message?.message}
          rows={3}
          multiline
          {...register("message")}
        />
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          size="large"
          disabled={formState.isSubmitting}
          sx={{ width: "100%", maxWidth: "450px" }}
        >
          Отправить
        </Button>
      </Stack>
    </form>
  );
}
