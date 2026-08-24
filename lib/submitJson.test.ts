import { describe, expect, it, vi } from "vitest";
import { submitJson } from "./submitJson";

describe("submitJson", () => {
  it("resolves only for an ok response", async () => {
    const request = vi.fn().mockResolvedValue({ ok: true });

    await expect(
      submitJson("/api/doctor", { name: "Анна" }, request),
    ).resolves.toBeUndefined();
    expect(request).toHaveBeenCalledWith("/api/doctor", {
      body: JSON.stringify({ name: "Анна" }),
      headers: { "content-type": "application/json" },
      method: "PUT",
    });
  });

  it("throws a stable client-safe error for HTTP and network failure", async () => {
    const httpFailure = vi.fn().mockResolvedValue({ ok: false });
    const networkFailure = vi.fn().mockRejectedValue(new Error("smtp detail"));

    await expect(
      submitJson("/api/doctor", {}, httpFailure),
    ).rejects.toThrow("FORM_SUBMISSION_FAILED");
    await expect(
      submitJson("/api/doctor", {}, networkFailure),
    ).rejects.toThrow("FORM_SUBMISSION_FAILED");
  });
});
