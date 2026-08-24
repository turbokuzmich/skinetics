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
