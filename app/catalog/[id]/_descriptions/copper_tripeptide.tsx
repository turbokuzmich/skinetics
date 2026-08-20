import Typography from "@mui/material/Typography";

export default function CopperTripeptideDescription() {
  return (
    <>
      <Typography paragraph>
        Несмываемая сыворотка-бустер с пептидами предназначена для ухода за
        кожей головы и волосами, склонными к выпадению. Средство также можно
        использовать для ухода за бородой: лёгкая текстура впитывается и не
        утяжеляет волосы.
      </Typography>
      <Typography variant="h6" component="h4">
        Активные компоненты
      </Typography>
      <Typography paragraph>
        В составе указаны трипептид меди-1 GHK-Cu, низко- и
        высокомолекулярная гиалуроновая кислота, пантенол, кофеин, аллантоин,
        экстракты крапивы, календулы и чёрного перца. По информации
        производителя, 95,7% формулы составляют компоненты натурального
        происхождения.
      </Typography>
      <Typography variant="h6" component="h4" gutterBottom>
        Формат ухода
      </Typography>
      <Typography component="ul" paragraph>
        <Typography component="li" gutterBottom>
          Поддерживает рост волос и помогает уменьшить их выпадение.
        </Typography>
        <Typography component="li" gutterBottom>
          Подходит для регулярного несмываемого ухода за кожей головы и
          волосами от корней до кончиков.
        </Typography>
        <Typography component="li">
          Может использоваться самостоятельно или вместе с другими средствами
          ухода за волосами.
        </Typography>
      </Typography>
      <Typography variant="h6" component="h4">
        Как пользоваться?
      </Typography>
      <Typography paragraph>
        Нанесите сыворотку с помощью спреера на кожу головы, избегая попадания в
        глаза, затем массируйте до впитывания. Средство не требует смывания.
      </Typography>
      <Typography variant="h6" component="h4">
        Важная информация
      </Typography>
      <Typography paragraph>
        Возможна индивидуальная непереносимость компонентов. При появлении
        раздражения прекратите применение. Косметическое средство не заменяет
        консультацию врача при выраженном или длительном дискомфорте кожи
        головы.
      </Typography>
    </>
  );
}
