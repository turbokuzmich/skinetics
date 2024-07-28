"use client";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import A from "@mui/material/Link";
import Logo from "./logo";
import { navigation } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { doctorFormSchema, type DoctorForm } from "@/lib/dto/doctorForm";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Footer() {
  return (
    <Container sx={{ flexShrink: 0, flexGrow: 0, py: { xs: 8, sm: 16 } }}>
      <Grid
        container
        alignItems={{
          md: "center",
        }}
        spacing={{ xs: 8, md: 2 }}
      >
        <Grid xs={12} md={8}>
          <Typography variant="h5" gutterBottom>
            Записаться к трихологу
          </Typography>
          <DoctorForm />
        </Grid>
        <Grid xs={12} md={4}>
          <Stack
            gap={2}
            alignItems={{ xs: "center", md: "flex-start" }}
            useFlexGap
          >
            <Box width={120}>
              <Logo />
            </Box>
            {navigation.map((navi) => (
              <A
                key={navi.to}
                variant="body1"
                color="text.primary"
                href={navi.to}
                underline="always"
                component={Link}
              >
                {navi.title}
              </A>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

const defaultFormValues: DoctorForm = {
  name: "",
  phone: "",
};

function DoctorForm() {
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
