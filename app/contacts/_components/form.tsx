"use client";

import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { reachGoalForm } from "@/lib/metrika";
import { feedbackFormSchema, type FeedbackForm } from "@/lib/dto/feedbackForm";
import { submitJson } from "@/lib/submitJson";

const defaultFormValues: FeedbackForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function FeedbackForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);

  const { formState, register, handleSubmit } = useForm<FeedbackForm>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(feedbackFormSchema),
  });

  const onSubmit = useCallback(
    async (values: FeedbackForm) => {
      setSubmissionError(false);

      try {
        await submitJson("/api/feedback", values);
        setIsSubmitted(true);
      } catch {
        setSubmissionError(true);
        return;
      }

      try {
        reachGoalForm();
      } catch {
        // Analytics failure must not turn a delivered request into a retry.
      }
    },
    [],
  );

  return isSubmitted ? (
    <Alert severity="success" role="status" sx={{ m: 4 }}>
      Сообщение отправлено. Мы ответим по указанным контактам.
    </Alert>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2} padding={4} useFlexGap>
        <Typography component="h3" variant="h5">
          Напишите нам
        </Typography>
        <TextField
          label="Ваше имя"
          variant="outlined"
          error={Boolean(formState.errors.name)}
          helperText={formState.errors.name?.message}
          autoComplete="name"
          required
          {...register("name")}
        />
        <TextField
          label="Электронная почта"
          type="email"
          inputMode="email"
          variant="outlined"
          error={Boolean(formState.errors.email)}
          helperText={formState.errors.email?.message}
          autoComplete="email"
          required
          {...register("email")}
        />
        <TextField
          label="Номер телефона — необязательно"
          type="tel"
          inputMode="tel"
          variant="outlined"
          placeholder="Например, +7 123 123 23 45"
          error={Boolean(formState.errors.phone)}
          helperText={formState.errors.phone?.message}
          autoComplete="tel"
          {...register("phone")}
        />
        <TextField
          label="Сообщение"
          variant="outlined"
          error={Boolean(formState.errors.message)}
          helperText={formState.errors.message?.message}
          rows={3}
          multiline
          required
          {...register("message")}
        />
        {submissionError ? (
          <Alert severity="error" role="alert">
            Не удалось отправить сообщение. Попробуйте ещё раз или напишите на info@skinetics.ru.
          </Alert>
        ) : null}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={formState.isSubmitting}
          sx={{ width: "100%", maxWidth: "450px" }}
        >
          {formState.isSubmitting ? "Отправляем…" : "Отправить сообщение"}
        </Button>
      </Stack>
    </form>
  );
}
