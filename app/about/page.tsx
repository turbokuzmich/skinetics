import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Metrika from "../_components/metrika";
import Grid from "@mui/material/Grid2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "О бренде косметики Dr. Health | Skinetics",
  description:
    "Информация о бренде Dr. Health: производство косметики для ухода за кожей головы и волосами, реквизиты и ссылка на Wildberries.",
  alternates: {
    canonical: "/about",
  },
};

export default function About() {
  return (
    <Container
      sx={{
        pt: 12,
        pb: { xs: 8, sm: 16 },
      }}
    >
      <Metrika />
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="h2" component="h1" paragraph>
            О нас
          </Typography>
          <Typography paragraph>
            Рады приветствовать вас на нашем сайте, давайте знакомиться.
          </Typography>
          <Typography paragraph>
            Dr. Health — бренд косметики для ухода за кожей головы и волосами.
            На сайте можно ознакомиться с актуальными средствами, их составом,
            способом применения и перейти к покупке на Wildberries.
          </Typography>
          <Typography paragraph>
            При выборе средства учитывайте состав, индивидуальную реакцию кожи и
            информацию на упаковке. При выраженном или длительном дискомфорте
            кожи головы обратитесь к врачу.
          </Typography>
          <Typography paragraph>
            Информацию о подтверждённых свойствах, декларациях и маркировке
            следует сверять с документами производителя и карточкой товара.
          </Typography>
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
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} paddingTop={4}>
          <Typography variant="h5" sx={{ textTransform: "uppercase" }}>
            Реквизиты
          </Typography>
          <Typography variant="h6" gutterBottom>
            ООО «Демидов Люкс СПА»
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Р/с
                  </TableCell>
                  <TableCell align="right">40702810570010248314</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    К/с
                  </TableCell>
                  <TableCell align="right">30101810645250000092</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    БИК
                  </TableCell>
                  <TableCell align="right">044525092</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    ИНН
                  </TableCell>
                  <TableCell align="right">7751525117</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    КПП
                  </TableCell>
                  <TableCell align="right">775001001</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    ОКПО
                  </TableCell>
                  <TableCell align="right">42943661</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    ОГРН
                  </TableCell>
                  <TableCell align="right">5147746230297</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}
