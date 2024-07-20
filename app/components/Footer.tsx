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
import { useCallback } from "react";

export default function Footer() {
  return (
    <Container sx={{ flexShrink: 0, flexGrow: 0, py: 8 }}>
      <Grid
        container
        alignItems={{
          md: "center",
        }}
        spacing={2}
      >
        <Grid xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Записаться к трихологу
          </Typography>
          <DoctorForm />
        </Grid>
        <Grid xs={12} md={4}>
          <Stack gap={2} alignItems="flex-start" useFlexGap>
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
  const { formState, register, handleSubmit } = useForm<DoctorForm>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(doctorFormSchema),
  });

  const onSubmit = useCallback((values: DoctorForm) => {
    console.log(values);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          sx={{ width: "100%", maxWidth: "450px" }}
        >
          Записаться
        </Button>
      </Stack>
    </form>
  );
}
