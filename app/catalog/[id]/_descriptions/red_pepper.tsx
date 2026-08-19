import Typography from "@mui/material/Typography";

export default function () {
  return (
    <>
      <Typography paragraph>
        Несмываемая сыворотка Dr. Health с экстрактами красного и чёрного перца
        предназначена для регулярного косметического ухода за кожей головы и
        волосами.
      </Typography>
      <Typography variant="h6" component="h4">
        Состав
      </Typography>
      <Typography paragraph>
        В составе указаны ниацинамид, пантенол, гиалуроновая кислота, экстракты
        крапивы, ромашки и брокколи, а также экстракты и эфирные масла перцев.
        Полный перечень ингредиентов приведён ниже.
      </Typography>
      <Typography paragraph>
        Перед покупкой сверяйте состав на упаковке: производитель может
        обновлять формулу.
      </Typography>
      <Typography variant="h6" component="h4" gutterBottom>
        Формат ухода
      </Typography>
      <Typography component="ul" paragraph>
        <Typography component="li" gutterBottom>
          <Typography variant="subtitle2">Несмываемая текстура</Typography>
          <Typography component="div">
            Средство наносят на кожу головы и не смывают.
          </Typography>
        </Typography>
        <Typography component="li" gutterBottom>
          <Typography variant="subtitle2">Указанный состав</Typography>
          <Typography component="div">
            Состав и способ применения доступны в карточке средства.
          </Typography>
        </Typography>
        <Typography component="li">
          <Typography variant="subtitle2">Меры предосторожности</Typography>
          <Typography component="div">
            Перед первым применением проведите тест на индивидуальную
            чувствительность и следуйте инструкции на упаковке.
          </Typography>
        </Typography>
      </Typography>
      <Typography variant="h6" component="h4">
        Как применять?
      </Typography>
      <Typography paragraph>
        Нанесите средство на влажную или сухую кожу головы, предварительно
        разделив волосы по проборам. Лёгкими движениями распределите и не
        смывайте. Избегайте попадания в глаза.
      </Typography>
      <Typography variant="h6" component="h4">
        Для регулярного ухода
      </Typography>
      <Typography paragraph>
        Средство можно включить в привычный уход за волосами и кожей головы,
        если компоненты состава вам подходят. При появлении раздражения
        прекратите применение.
      </Typography>
      <Typography variant="h6" component="h4">
        Важная информация
      </Typography>
      <Typography paragraph>
        Сыворотка относится к косметическим средствам и не заменяет консультацию
        врача при выраженном или длительном дискомфорте кожи головы.
      </Typography>
    </>
  );
}
