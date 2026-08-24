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
        reachGoalForm();
        setIsSubmitted(true);
      } catch {
        setSubmissionError(true);
      }
    },
    [],
  );

  return isSubmitted ? (
    <Alert severity="success" role="status" sx={{ m: 4 }}>
      Мы свяжемся с вами в ближайшее время.
    </Alert>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          {...register("name")}
        />
        <TextField
          label="Электронная почта"
          variant="outlined"
          error={Boolean(formState.errors.email)}
          helperText={formState.errors.email?.message}
          autoComplete="email"
          {...register("email")}
        />
        <TextField
          label="Номер телефона"
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
          {...register("message")}
        />
        {submissionError ? (
          <Alert severity="error" role="alert">
            Не удалось отправить форму. Попробуйте ещё раз.
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
          {formState.isSubmitting ? "Отправляем…" : "Отправить"}
        </Button>
      </Stack>
    </form>
  );
}
