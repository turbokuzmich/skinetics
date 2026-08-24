import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import About, { metadata as aboutMetadata } from "./about/page";
import Contacts, { metadata as contactsMetadata } from "./contacts/page";

vi.mock("./_components/metrika", () => ({ default: () => null }));

const legalValues = [
  "40702810570010248314",
  "30101810645250000092",
  "044525092",
  "7751525117",
  "775001001",
  "42943661",
  "5147746230297",
] as const;

describe("trust pages", () => {
  it("presents the accepted multi-brand and company hierarchy on /about", () => {
    const { container } = render(<About />);

    expect(aboutMetadata.title).toBe(
      "О Skinetics, брендах и компании | Skinetics",
    );
    expect(aboutMetadata.description).toBe(
      "Skinetics объединяет косметику Dr. Health, SkineticsLab и Neon Beard. Информация об ООО «Демидов Люкс СПА», участии в московских программах и реквизитах.",
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "Skinetics и наши бренды" }),
    ).toBeVisible();
    expect(screen.getByText(/Skinetics — это каталог/)).toBeVisible();
    expect(screen.getByText("Dr. Health")).toBeVisible();
    expect(screen.getByText("SkineticsLab")).toBeVisible();
    expect(screen.getByText("Neon Beard")).toBeVisible();
    expect(
      screen.getByText(
        /ООО «Демидов Люкс СПА» — компания, которая управляет сайтом/,
      ),
    ).toBeVisible();

    expect(
      screen.getByText(
        "ООО «Демидов Люкс СПА» является членом Московского инновационного кластера.",
      ),
    ).toBeVisible();
    expect(
      screen.getByText(
        "Компания представлена в каталоге Московского экспортёра.",
      ),
    ).toBeVisible();
    expect(
      screen.getByText("Компания участвует в программе «Сделано в Москве»."),
    ).toBeVisible();

    for (const value of legalValues) {
      expect(screen.getByText(value)).toBeVisible();
    }

    expect(screen.getByRole("link", { name: "Смотреть каталог" })).toHaveAttribute(
      "href",
      "/catalog",
    );
    expect(screen.getByRole("link", { name: "Связаться с нами" })).toHaveAttribute(
      "href",
      "/contacts",
    );
    expect(container.querySelector('a[href*="wildberries.ru/brands"]')).toBeNull();
  });

  it("keeps accepted contact facts in a semantic address on /contacts", () => {
    const { container } = render(<Contacts />);

    expect(contactsMetadata.title).toBe(
      "Контакты и обратная связь | Skinetics",
    );
    expect(contactsMetadata.description).toBe(
      "Телефоны и электронная почта Skinetics, форма обратной связи и ссылки на каталог косметики Dr. Health, SkineticsLab и Neon Beard.",
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "Контакты" }),
    ).toBeVisible();

    const address = container.querySelector("address");
    expect(address).not.toBeNull();
    expect(
      within(address!).getByRole("link", { name: "+7 (495) 665 9015" }),
    ).toHaveAttribute("href", "tel:+74956659015");
    expect(
      within(address!).getByRole("link", { name: "+7 926 385 3751" }),
    ).toHaveAttribute("href", "tel:+79263853751");
    expect(
      within(address!).getByRole("link", { name: "info@skinetics.ru" }),
    ).toHaveAttribute("href", "mailto:info@skinetics.ru");

    expect(
      screen.getByRole("heading", { level: 2, name: "Обратная связь" }),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "О Skinetics" })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(screen.getByRole("link", { name: "Перейти в каталог" })).toHaveAttribute(
      "href",
      "/catalog",
    );
  });
});
