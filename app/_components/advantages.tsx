import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const items = [
  {
    title:
      "ООО «Демидов Люкс СПА» является членом Московского Инновационного Кластера",
  },
  {
    title: "Компания внесена в международный каталог Московского Экспортёра",
  },
  {
    title:
      "Продукции присвоен статус фирменного бренда г. Москвы «СДЕЛАНО В МОСКВЕ»",
  },
  {
    title:
      "В производстве продукции используются ингредиенты высокого качества от надёжных производителей и поставщиков",
  },
  {
    title: "Осуществляется технологический контроль выпускаемой продукции",
  },
  {
    title: "Соблюдается баланс высокого качества и демократичных цен",
  },
  {
    title:
      "Внедряются инновационные решения в разработки современных и эффективных рецептур",
  },
  {
    title:
      "Над созданием нашей косметической продукции работают специалисты с стажем работы от 15 лет",
  },
  {
    title:
      "Создание ароматов в руках профессиональных парфюмеров окончивших парфюмерные школы, в том числе во Франции",
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        bgcolor: "grey.100",
      }}
    >
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: "100%", md: "60%" },
            textAlign: { sm: "left", md: "center" },
          }}
        >
          <Typography component="h2" variant="h4">
            Преимущества
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: "100%",
                  border: "1px solid",
                  borderColor: "grey.200",
                }}
              >
                <Typography>{item.title}</Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
