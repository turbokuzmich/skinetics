import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function About() {
  return (
    <Container
      sx={{
        pt: 12,
        pb: { xs: 8, sm: 16 },
      }}
    >
      <Box
        sx={{
          maxWidth: 800,
        }}
      >
        <Typography variant="h2" paragraph>
          О нас
        </Typography>
        <Typography paragraph>
          Рады приветствовать вас на нашем сайте, давайте знакомиться.
        </Typography>
        <Typography paragraph>
          Бренд косметики для здоровья кожи и волос Dr.Health — это современное
          и высокотехнологичное производство косметических продуктов
          премиального уровня по демократичной стоимости. Инновационные решения
          и опытные технологи воплощают уникальные рецептуры на базе разработок
          и исследований учёных и под чутким руководством профессиональных
          врачей-трихологов и дерматологов. Наша цель — всё полезное людям!
          Именно поэтому мы создаём эффективную и доступную косметику.{" "}
        </Typography>
        <Typography paragraph>
          Большой накопленный опыт и научная база — основополагающий принцип
          производства, заложенный в 2014 году. Он соблюдает традиции качества и
          эффективности выпускаемой продукции.
        </Typography>
        <Typography paragraph>
          Современные технологии и высокое качество обеспечиваются слаженной
          работой профессионалов на каждом этапе производственных циклов и
          гарантируют высокое качество нашей продукции.
        </Typography>
      </Box>
      <Button
        size="large"
        href="https://www.wildberries.ru/brands/dr-health"
        target="blank"
        rel="noopener"
        sx={{
          color: "white",
          textTransform: "uppercase",
          backgroundColor: "transparent",
          paddingInline: 4,
          paddingBlock: 2,
          backgroundImage:
            "linear-gradient(0.819turn,rgba(99,16,127,1) 0%,rgba(176,18,159,1) 100%)",
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&:active": {
            backgroundColor: "transparent",
          },
          "&:focus": {
            backgroundColor: "transparent",
          },
        }}
      >
        Мы на wildberries
      </Button>
    </Container>
  );
}
