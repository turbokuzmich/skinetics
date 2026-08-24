import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PUT as submitDoctorForm } from "./doctor/route";
import { PUT as submitFeedbackForm } from "./feedback/route";

const { sendMailMock } = vi.hoisted(() => ({
  sendMailMock: vi.fn(),
}));

vi.mock("nodemailer", () => ({
  default: {
    createTransport: vi.fn(() => ({ sendMail: sendMailMock })),
  },
}));

function createRequest(path: string, body: unknown) {
  return new NextRequest(`https://skinetics.ru${path}`, {
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
    method: "PUT",
  });
}

function createMalformedRequest(path: string) {
  return new NextRequest(`https://skinetics.ru${path}`, {
    body: "{",
    headers: { "content-type": "application/json" },
    method: "PUT",
  });
}

describe("form API routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each([
    {
      path: "/api/doctor",
      submit: submitDoctorForm,
      values: { name: "Анна", phone: "+7 123 123 23 23" },
      logMessage: "Doctor form email delivery failed.",
    },
    {
      path: "/api/feedback",
      submit: submitFeedbackForm,
      values: {
        name: "Анна",
        email: "anna@example.com",
        phone: "",
        message: "Хочу уточнить состав средства",
      },
      logMessage: "Feedback form email delivery failed.",
    },
  ])(
    "returns a generic 502 response when $path delivery fails",
    async ({ path, submit, values, logMessage }) => {
      const log = vi.spyOn(console, "error").mockImplementation(() => undefined);
      sendMailMock.mockRejectedValueOnce(new Error("smtp secret detail"));

      const response = await submit(createRequest(path, values));

      expect(response.status).toBe(502);
      await expect(response.json()).resolves.toEqual({ success: false });
      expect(log).toHaveBeenCalledWith(logMessage);
      expect(log).not.toHaveBeenCalledWith(expect.stringContaining("Анна"));
      expect(log).not.toHaveBeenCalledWith(
        expect.stringContaining("smtp secret detail"),
      );
      log.mockRestore();
    },
  );

  it("keeps validation failure at 400 without attempting delivery", async () => {
    const response = await submitDoctorForm(
      createRequest("/api/doctor", { name: "А", phone: "123" }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ success: false });
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it.each([
    { path: "/api/doctor", submit: submitDoctorForm },
    { path: "/api/feedback", submit: submitFeedbackForm },
  ])(
    "returns a generic 400 response for malformed JSON at $path",
    async ({ path, submit }) => {
      const response = await submit(createMalformedRequest(path));

      expect(response.status).toBe(400);
      await expect(response.json()).resolves.toEqual({ success: false });
      expect(sendMailMock).not.toHaveBeenCalled();
    },
  );

  it.each([
    {
      path: "/api/doctor",
      submit: submitDoctorForm,
      values: {
        name: "</pre><img src=x onerror=alert(1)>",
        phone: "+7 123 123 23 23",
      },
    },
    {
      path: "/api/feedback",
      submit: submitFeedbackForm,
      values: {
        name: "Анна",
        email: "anna@example.com",
        phone: "",
        message: "</pre><img src=x onerror=alert(1)>",
      },
    },
  ])(
    "puts hostile-looking user input only in a plain-text email for $path",
    async ({ path, submit, values }) => {
      sendMailMock.mockResolvedValueOnce(undefined);

      const response = await submit(createRequest(path, values));

      expect(response.status).toBe(200);
      expect(sendMailMock).toHaveBeenCalledTimes(1);
      const mail = sendMailMock.mock.calls[0][0];
      expect(mail).not.toHaveProperty("html");
      expect(mail).toHaveProperty("text");
      expect(mail.text).toContain("</pre><img src=x onerror=alert(1)>");
    },
  );

  it("keeps successful delivery at 200", async () => {
    sendMailMock.mockResolvedValueOnce(undefined);

    const response = await submitFeedbackForm(
      createRequest("/api/feedback", {
        name: "Анна",
        email: "anna@example.com",
        phone: "",
        message: "Хочу уточнить состав средства",
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
  });
});
