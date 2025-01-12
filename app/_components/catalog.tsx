import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import WbButton from "./wbButton";
import { items } from "@/constants";

export default function Catalog({
  header = "Косметика для волос Dr. Health",
  omitDescription,
}: Readonly<{ header?: string; omitDescription?: boolean }>) {
  return (
    <Container
      id="catalog"
      sx={{
        pt: { xs: 4, sm: 6 },
        pb: { xs: 8, sm: 16 },
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
        {omitDescription ? null : (
          <Typography
            variant="h6"
            color="text.secondary"
            paddingBottom={3}
            fontWeight={400}
            lineHeight="2rem"
          >
            Бренд косметики для здоровья кожи и волос Dr.Health — современное и
            высокотехнологичное производство косметических продуктов
            премиального уровня по демократичной стоимости
          </Typography>
        )}
        <Typography component="h1" variant="h4" color="text.primary">
          {header}
        </Typography>
        {/* <Typography variant="body1" color="text.secondary">
          See what our customers love about our products. Discover how we excel
          in efficiency, durability, and satisfaction. Join us for quality,
          innovation, and reliable support.
        </Typography> */}
      </Box>
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={item.id}
            sx={{ display: "flex" }}
          >
            <Card
              sx={{ width: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                image={item.image}
                sx={{
                  height: 250,
                  backgroundSize: "contain",
                  flexShrink: 0,
                  flexGrow: 0,
                }}
              />
              <CardHeader
                title={item.title}
                titleTypographyProps={{
                  variant: "h6",
                  lineHeight: "1.7rem",
                  gutterBottom: true,
                }}
                subheader={item.subheader}
                sx={{ flexGrow: 1, alignItems: "flex-start" }}
              />
              <CardActions
                sx={{
                  p: 2,
                  flexShrink: 0,
                  flexGrow: 0,
                  justifyContent: "space-between",
                }}
              >
                <Link href={`/catalog/${item.id}`}>
                  <Button variant="outlined" color="primary" size="large">
                    Подробнее
                  </Button>
                </Link>
                <WbButton
                  link={item.links.wildberries}
                  buttonText="Купить на WB"
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
