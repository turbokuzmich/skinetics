import { NextRequest, NextResponse } from "next/server";
import { feedbackFormSchema } from "@/lib/dto/feedbackForm";
import nodemailer, { type Transporter } from "nodemailer";

export const dynamic = "force-dynamic";

const getTransport = (function () {
  let transport: Transporter;

  return () => {
    if (!transport) {
      transport = nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    }

    return transport;
  };
})();

export async function PUT(request: NextRequest) {
  const parsed = feedbackFormSchema.safeParse(await request.json());

  if (parsed.error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  await getTransport().sendMail({
    to: "info@skinetics.ru",
    html: `<pre>${JSON.stringify(parsed.data, null, 2)}</pre>`,
    subject: "Обратная связь на сайте",
    from: process.env.EMAIL_SENDER,
  });

  return NextResponse.json({ success: true });
}
