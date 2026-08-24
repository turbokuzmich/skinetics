"use client";

import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { zodResolver } from "@hookform/resolvers/zod";
import { doctorFormSchema, type DoctorForm } from "@/lib/dto/doctorForm";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { reachGoalForm } from "@/lib/metrika";
import { submitJson } from "@/lib/submitJson";

const defaultFormValues: DoctorForm = {
  name: "",
  phone: "",
};

export default function DoctorForm() {
  const router = useRouter();
  const params = useSearchParams();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);

  const { formState, setFocus, register, handleSubmit } = useForm<DoctorForm>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(doctorFormSchema),
  });

  const onSubmit = useCallback(
    async (values: DoctorForm) => {
      setSubmissionError(false);

      try {
        await submitJson("/api/doctor", values);
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

  useEffect(() => {
    if (params.has("appointment")) {
      router.replace("/", { scroll: false });

      document
        .getElementById("appointment-form")
        ?.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        setFocus("name");
      }, 500);
    }
  }, [params, router, setFocus]);

  return isSubmitted ? (
    <Alert severity="success" role="status">
      Мы свяжемся с вами в ближайшее время.
    </Alert>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} id="appointment-form" noValidate>
      <Stack spacing={2} useFlexGap>
        <TextField
          label="Ваше имя"
          variant="outlined"
          sx={{ width: "100%", maxWidth: "450px" }}
          error={Boolean(formState.errors.name)}
          helperText={formState.errors.name?.message}
          autoComplete="name"
          required
          {...register("name")}
        />
        <TextField
          label="Номер телефона"
          variant="outlined"
          placeholder="Например, +7 123 123 23 45"
          sx={{ width: "100%", maxWidth: "450px" }}
          error={Boolean(formState.errors.phone)}
          helperText={formState.errors.phone?.message}
          autoComplete="tel"
          required
          {...register("phone")}
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
          {formState.isSubmitting ? "Отправляем…" : "Записаться"}
        </Button>
      </Stack>
    </form>
  );
}
