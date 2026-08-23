import Typography from "@mui/material/Typography";
import type { ProductContent } from "@/types";

export default function ProductDescription({
  content,
}: Readonly<{ content: ProductContent }>) {
  return (
    <>
      <Typography paragraph>{content.overview}</Typography>
      <Typography variant="h6" component="h4">
        Активные компоненты
      </Typography>
      <Typography paragraph>{content.activeComponents}</Typography>
      <Typography variant="h6" component="h4" gutterBottom>
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
      <Typography variant="h6" component="h4">
        {content.application.heading}
      </Typography>
      <Typography paragraph>{content.application.instructions}</Typography>
      <Typography variant="h6" component="h4">
        Важная информация
      </Typography>
      <Typography paragraph>{content.precautions}</Typography>
    </>
  );
}
