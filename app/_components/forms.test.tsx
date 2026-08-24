import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import DoctorForm from "./form";
import FeedbackForm from "../contacts/_components/form";
import { submitJson } from "@/lib/submitJson";
import { reachGoalForm } from "@/lib/metrika";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock("@/lib/submitJson", () => ({
  submitJson: vi.fn(),
}));

vi.mock("@/lib/metrika", () => ({
  reachGoalForm: vi.fn(),
}));

const submitJsonMock = vi.mocked(submitJson);
const reachGoalFormMock = vi.mocked(reachGoalForm);

describe("lead forms", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("identifies every field and required value explicitly", () => {
    const { container, unmount } = render(<DoctorForm />);

    const doctorName = screen.getByRole("textbox", { name: "Ваше имя" });
    const doctorPhone = screen.getByRole("textbox", {
      name: "Номер телефона",
    });
    expect(doctorName).toBeVisible();
    expect(doctorPhone).toBeVisible();
    expect(doctorName).toBeRequired();
    expect(doctorPhone).toBeRequired();
    expect(container.querySelector("form")).toHaveAttribute("novalidate");

    unmount();
    const feedback = render(<FeedbackForm />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Напишите нам" }),
    ).toBeVisible();
    const feedbackName = screen.getByRole("textbox", { name: "Ваше имя" });
    const feedbackEmail = screen.getByRole("textbox", {
      name: "Электронная почта",
    });
    const feedbackPhone = screen.getByRole("textbox", {
      name: "Номер телефона",
    });
    const feedbackMessage = screen.getByRole("textbox", {
      name: "Сообщение",
    });
    expect(feedbackName).toBeRequired();
    expect(feedbackEmail).toBeRequired();
    expect(feedbackPhone).not.toBeRequired();
    expect(feedbackMessage).toBeRequired();
    expect(feedback.container.querySelector("form")).toHaveAttribute(
      "novalidate",
    );
  });

  it("associates client-validation messages with their fields", async () => {
    const user = userEvent.setup();
    render(<DoctorForm />);

    const name = screen.getByRole("textbox", { name: "Ваше имя" });
    const phone = screen.getByRole("textbox", { name: "Номер телефона" });
    await user.click(screen.getByRole("button", { name: "Записаться" }));

    expect(name).toHaveAccessibleDescription("Пожалуйста, укажите имя");
    expect(phone).toHaveAccessibleDescription(
      "Пожалуйста, укажите номер телефона в формате +7 123 123 23 23",
    );
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(phone).toHaveAttribute("aria-invalid", "true");
    expect(submitJsonMock).not.toHaveBeenCalled();
  });

  it("keeps doctor-form values after failure and succeeds on retry", async () => {
    const user = userEvent.setup();
    submitJsonMock
      .mockRejectedValueOnce(new Error("FORM_SUBMISSION_FAILED"))
      .mockResolvedValueOnce(undefined);
    render(<DoctorForm />);

    const name = screen.getByRole("textbox", { name: "Ваше имя" });
    const phone = screen.getByRole("textbox", { name: "Номер телефона" });
    await user.type(name, "Анна");
    await user.type(phone, "+7 123 123 23 23");
    await user.click(screen.getByRole("button", { name: "Записаться" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Не удалось отправить форму. Попробуйте ещё раз.",
    );
    expect(name).toHaveValue("Анна");
    expect(phone).toHaveValue("+7 123 123 23 23");
    expect(reachGoalFormMock).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: "Записаться" }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Мы свяжемся с вами в ближайшее время.",
    );
    expect(submitJsonMock).toHaveBeenCalledTimes(2);
    expect(reachGoalFormMock).toHaveBeenCalledTimes(1);
  });

  it("communicates pending feedback submission without hiding field values", async () => {
    const user = userEvent.setup();
    let resolveRequest!: () => void;
    submitJsonMock.mockImplementationOnce(
      () =>
        new Promise<void>((resolve) => {
          resolveRequest = resolve;
        }),
    );
    render(<FeedbackForm />);

    const name = screen.getByRole("textbox", { name: "Ваше имя" });
    await user.type(name, "Анна");
    await user.type(
      screen.getByRole("textbox", { name: "Электронная почта" }),
      "anna@example.com",
    );
    await user.type(
      screen.getByRole("textbox", { name: "Сообщение" }),
      "Хочу уточнить состав средства",
    );
    await user.click(screen.getByRole("button", { name: "Отправить" }));

    const pendingButton = await screen.findByRole("button", {
      name: "Отправляем…",
    });
    expect(pendingButton).toBeDisabled();
    expect(name).toHaveValue("Анна");
    expect(name).not.toBeDisabled();
    expect(reachGoalFormMock).not.toHaveBeenCalled();

    resolveRequest();

    await waitFor(() => expect(reachGoalFormMock).toHaveBeenCalledTimes(1));
    expect(screen.getByRole("status")).toHaveTextContent(
      "Мы свяжемся с вами в ближайшее время.",
    );
  });

  it("shows doctor-form success when analytics throws after delivery", async () => {
    const user = userEvent.setup();
    submitJsonMock.mockResolvedValueOnce(undefined);
    reachGoalFormMock.mockImplementationOnce(() => {
      throw new Error("analytics unavailable");
    });
    render(<DoctorForm />);

    await user.type(
      screen.getByRole("textbox", { name: "Ваше имя" }),
      "Анна",
    );
    await user.type(
      screen.getByRole("textbox", { name: "Номер телефона" }),
      "+7 123 123 23 23",
    );
    await user.click(screen.getByRole("button", { name: "Записаться" }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Мы свяжемся с вами в ближайшее время.",
    );
    expect(submitJsonMock).toHaveBeenCalledTimes(1);
    expect(reachGoalFormMock).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("button", { name: "Записаться" })).toBeNull();
  });

  it("shows feedback success when analytics throws after delivery", async () => {
    const user = userEvent.setup();
    submitJsonMock.mockResolvedValueOnce(undefined);
    reachGoalFormMock.mockImplementationOnce(() => {
      throw new Error("analytics unavailable");
    });
    render(<FeedbackForm />);

    await user.type(
      screen.getByRole("textbox", { name: "Ваше имя" }),
      "Анна",
    );
    await user.type(
      screen.getByRole("textbox", { name: "Электронная почта" }),
      "anna@example.com",
    );
    await user.type(
      screen.getByRole("textbox", { name: "Сообщение" }),
      "Хочу уточнить состав средства",
    );
    await user.click(screen.getByRole("button", { name: "Отправить" }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Мы свяжемся с вами в ближайшее время.",
    );
    expect(submitJsonMock).toHaveBeenCalledTimes(1);
    expect(reachGoalFormMock).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("button", { name: "Отправить" })).toBeNull();
  });
});
