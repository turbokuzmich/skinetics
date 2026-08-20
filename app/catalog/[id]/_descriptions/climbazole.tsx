import Typography from "@mui/material/Typography";

export default function ClimbazoleDescription() {
  return (
    <>
      <Typography paragraph>
        Несмываемая сыворотка предназначена для ухода за кожей головы, склонной
        к перхоти, себорее, шелушению и жирности. Средство используют отдельно
        от мытья головы: оно наносится по проборам и не требует смывания.
      </Typography>
      <Typography variant="h6" component="h4">
        Активные компоненты
      </Typography>
      <Typography paragraph>
        Формула сочетает климбазол, пироктон оламин и метилсульфонилметан (МСМ).
        Уход дополняют низко- и высокомолекулярная гиалуроновая кислота,
        аллантоин и экстракт ромашки.
      </Typography>
      <Typography variant="h6" component="h4" gutterBottom>
        Действие средства
      </Typography>
      <Typography component="ul" paragraph>
        <Typography component="li" gutterBottom>
          Предназначено для ухода против перхоти и себореи.
        </Typography>
        <Typography component="li" gutterBottom>
          Помогает регулировать работу сальных желёз.
        </Typography>
        <Typography component="li">
          Подходит для проблемной кожи головы и всех типов волос.
        </Typography>
      </Typography>
      <Typography variant="h6" component="h4">
        Как использовать?
      </Typography>
      <Typography paragraph>
        Хорошо встряхните флакон, нанесите средство с помощью дозатора на кожу
        головы по проборам и массируйте до впитывания. Не смывайте. Голову можно
        мыть в привычном режиме по мере необходимости.
      </Typography>
      <Typography variant="h6" component="h4">
        Важная информация
      </Typography>
      <Typography paragraph>
        Возможна индивидуальная непереносимость компонентов. Избегайте
        попадания средства в глаза; при попадании промойте их водой. При стойком
        зуде, шелушении или другом выраженном дискомфорте обратитесь к
        дерматологу.
      </Typography>
    </>
  );
}
