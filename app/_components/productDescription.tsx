import Typography from "@mui/material/Typography";
import type { ProductContent } from "@/types";

export default function ProductDescription({
  content,
}: Readonly<{ content: ProductContent }>) {
  return (
    <>
      <Typography paragraph>{content.overview}</Typography>
      {content.suitableUse ? (
        <>
          <Typography variant="h6" component="h2">
            Кому подходит
          </Typography>
          <Typography paragraph>{content.suitableUse}</Typography>
        </>
      ) : null}
      <Typography variant="h6" component="h2">
        Активные компоненты
      </Typography>
      <Typography paragraph>{content.activeComponents}</Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        {content.featureSection.heading}
      </Typography>
      <Typography component="ul" paragraph>
        {content.featureSection.items.map((item, index) => (
          <Typography
            component="li"
            gutterBottom={index < content.featureSection.items.length - 1}
            key={item}
          >
            {item}
          </Typography>
        ))}
      </Typography>
      <Typography variant="h6" component="h2">
        {content.application.heading}
      </Typography>
      <Typography paragraph>{content.application.instructions}</Typography>
      <Typography variant="h6" component="h2">
        {content.precautionsHeading ?? "Важная информация"}
      </Typography>
      <Typography paragraph>{content.precautions}</Typography>
    </>
  );
}
