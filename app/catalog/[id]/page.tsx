import type { Item } from "@/types";
import { items } from "@/constants";
import { redirect } from "next/navigation";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function CatalogItem({
  params: { id },
}: Readonly<{
  params: { id: Item["id"] };
}>) {
  const item = items.find((item) => item.id === id);

  if (!item) {
    redirect(`/catalog/${items[0].id}`);
  }

  return (
    <>
      <Container sx={{ pt: 12, pb: 3 }}>
        <Stack
          gap={2}
          direction={{
            xs: "column",
            md: "row",
          }}
          useFlexGap
        >
          <Box
            flexShrink={0}
            flexGrow={0}
            sx={{
              backgroundImage: `url(/items/${item.id}.png)`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: {
                xs: 350,
                md: 500,
              },
              width: {
                xs: "auto",
                md: 500,
              },
            }}
          />
          <Box>
            <Typography variant="body1" color="text.secondary">
              {item.subheader}
            </Typography>
            <Typography variant="h5" paragraph>
              {item.title}
            </Typography>
            <Typography variant="subtitle2">Объем</Typography>
            <Typography paragraph>{item.volume}</Typography>
            <Typography variant="subtitle2">Действие</Typography>
            <Typography paragraph>{item.effect}</Typography>
            <Typography variant="subtitle2">Состав</Typography>
            <Typography paragraph>{item.composition}</Typography>
            <Typography variant="subtitle2">Применение</Typography>
            <Typography paragraph>{item.usage}</Typography>
            {item.warning ? (
              <>
                <Typography variant="subtitle2">Противопоказания</Typography>
                <Typography paragraph>{item.warning}</Typography>
              </>
            ) : null}
            {item.description.map((description) => (
              <Typography key={description} paragraph>
                {description}
              </Typography>
            ))}
            <Button
              size="large"
              href={item.links.wildberries}
              target="blank"
              rel="noopener"
              sx={{
                color: "white",
                textTransform: "uppercase",
                backgroundColor: "transparent",
                paddingInline: 3,
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
              Купить на wildberries
            </Button>
          </Box>
        </Stack>
      </Container>
      <Divider />
    </>
  );
}
