import { NextRequest, NextResponse } from "next/server";
import { doctorFormSchema, type DoctorForm } from "@/lib/dto/doctorForm";
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
  let values: unknown;

  try {
    values = await request.json();
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const parsed = doctorFormSchema.safeParse(values);

  if (parsed.error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  try {
    await getTransport().sendMail({
      to: "info@skinetics.ru",
      text: JSON.stringify(parsed.data, null, 2),
      subject: "Запись к трихологу",
      from: process.env.EMAIL_SENDER,
    });
  } catch {
    console.error("Doctor form email delivery failed.");
    return NextResponse.json({ success: false }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
