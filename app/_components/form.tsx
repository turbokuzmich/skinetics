"use client";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { zodResolver } from "@hookform/resolvers/zod";
import { doctorFormSchema, type DoctorForm } from "@/lib/dto/doctorForm";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type ReachGoalFn = (id: number, method: string, param: string) => void;

const defaultFormValues: DoctorForm = {
  name: "",
  phone: "",
};

export default function DoctorForm() {
  const router = useRouter();
  const params = useSearchParams();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const { formState, register, handleSubmit } = useForm<DoctorForm>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(doctorFormSchema),
  });

  const onSubmit = useCallback(
    async (values: DoctorForm) => {
      await fetch("/api/doctor", {
        body: JSON.stringify(values),
        headers: {
          "content-type": "application/json",
        },
        method: "PUT",
      });

      if ("ym" in window) {
        (window.ym as ReachGoalFn)(98874723, "reachGoal", "form");
      }

      setIsSubmitted(true);
    },
    [setIsSubmitted]
  );

  useEffect(() => {
    if (params.has("appointment")) {
      router.replace("/", { scroll: false });
      document
        .getElementById("appointment-form")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [router]);

  return isSubmitted ? (
    <Typography>Мы свяжемся с вами в ближайшее время</Typography>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} id="appointment-form">
      <Stack spacing={2} useFlexGap>
        <TextField
          variant="outlined"
          placeholder="Ваше имя"
          sx={{ width: "100%", maxWidth: "450px" }}
          error={Boolean(formState.errors.name)}
          helperText={formState.errors.name?.message}
          {...register("name")}
        />
        <TextField
          variant="outlined"
          placeholder="Номер телефона (например, +7 123 123 23 45)"
          sx={{ width: "100%", maxWidth: "450px" }}
          error={Boolean(formState.errors.phone)}
          helperText={formState.errors.phone?.message}
          {...register("phone")}
        />
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          size="large"
          disabled={formState.isSubmitting}
          sx={{ width: "100%", maxWidth: "450px" }}
        >
          Записаться
        </Button>
      </Stack>
    </form>
  );
}
