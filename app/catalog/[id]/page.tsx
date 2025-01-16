import type { FC } from "react";
import type { Item } from "@/types";
import { items } from "@/constants";
import { redirect } from "next/navigation";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Metrika from "@/app/_components/metrika";
import WbButton from "@/app/_components/wbButton";
import { type Metadata } from "next";
import RedPepper from "./_descriptions/red_pepper";
import CopperTripeptide from "./_descriptions/copper_tripeptide";
import Climbazole from "./_descriptions/climbazole";

type Props = Readonly<{
  params: { id: Item["id"] };
}>;

export function generateMetadata({ params: { id } }: Props): Metadata {
  const item = items.find((item) => item.id === id);

  return item?.metadata ?? {};
}

function Null() {
  return null;
}

const descriptions: Record<string, FC> = {
  red_pepper: RedPepper,
  copper_tripeptide: CopperTripeptide,
  climbazole: Climbazole,
};

export default function CatalogItem({ params: { id } }: Props) {
  const item = items.find((item) => item.id === id);

  if (!item) {
    redirect("/catalog/");
  }

  const Description: FC = descriptions[item.id] ?? Null;

  return (
    <>
      <Metrika />
      <Container sx={{ pt: 12, pb: { xs: 8, sm: 16 } }}>
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
              backgroundImage: `url(${item.image})`,
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
            {/* <Typography variant="body1" color="text.secondary">
              {item.subheader}
            </Typography>
            <Typography variant="h5" paragraph>
              {item.title}
            </Typography> */}
            <Typography variant="h5" component="h1" paragraph>
              {item.metadata.other?.header ?? item.title}
            </Typography>
            <Typography variant="subtitle2">Объем</Typography>
            <Typography paragraph>{item.volume}</Typography>
            <Box marginBottom={2}>
              <WbButton link={item.links.wildberries} />
            </Box>
            <Description />
            {/* {item.description.map((description) => (
              <Typography key={description} paragraph>
                {description}
              </Typography>
            ))} */}
            <Typography variant="h6" component="div">
              Действие
            </Typography>
            <Typography paragraph>{item.effect}</Typography>
            <Typography variant="h6" component="div">
              Состав
            </Typography>
            <Typography paragraph>{item.composition}</Typography>
            <Typography variant="h6" component="div">
              Применение
            </Typography>
            <Typography paragraph>{item.usage}</Typography>
            {item.warning ? (
              <>
                <Typography variant="h6" component="div">
                  Противопоказания
                </Typography>
                <Typography paragraph>{item.warning}</Typography>
              </>
            ) : null}
          </Box>
        </Stack>
      </Container>
      <Divider />
    </>
  );
}
