import Typography from "@mui/material/Typography";

export default function RedPepperDescription() {
  return (
    <>
      <Typography paragraph>
        Несмываемая сыворотка-спрей с красным перцем и никотиновой кислотой
        предназначена для ухода за кожей головы и волосами, склонными к
        выпадению. Средство подходит женщинам и мужчинам, быстро впитывается и
        не утяжеляет волосы.
      </Typography>
      <Typography variant="h6" component="h4">
        Активные компоненты
      </Typography>
      <Typography paragraph>
        Формула содержит ниацинамид (витамин B3), пантенол (провитамин B5),
        низко- и высокомолекулярную гиалуроновую кислоту, аллантоин, экстракты
        крапивы, ромашки и брокколи, олеорезин стручкового перца и эфирное масло
        чёрного перца. По информации производителя, 97,3% формулы составляют
        вещества натурального происхождения.
      </Typography>
      <Typography variant="h6" component="h4" gutterBottom>
        Действие и тип волос
      </Typography>
      <Typography component="ul" paragraph>
        <Typography component="li" gutterBottom>
          Поддерживает рост волос и помогает уменьшить их выпадение.
        </Typography>
        <Typography component="li" gutterBottom>
          Предназначена для ухода за корнями и кожей головы, а также для
          регулирования работы сальных желёз.
        </Typography>
        <Typography component="li">
          Подходит для тонких, ослабленных, ломких и повреждённых волос.
        </Typography>
      </Typography>
      <Typography variant="h6" component="h4">
        Как применять?
      </Typography>
      <Typography paragraph>
        Нанесите средство с помощью дозатора на кожу головы по проборам,
        избегая попадания в глаза. После нанесения помассируйте кожу до
        впитывания и не смывайте. Рекомендовано курсовое применение.
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
