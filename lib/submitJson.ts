type Request = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Pick<Response, "ok">>;

export async function submitJson<T>(
  endpoint: string,
  values: T,
  request: Request = fetch,
) {
  try {
    const response = await request(endpoint, {
      body: JSON.stringify(values),
      headers: { "content-type": "application/json" },
      method: "PUT",
    });

    if (!response.ok) {
      throw new Error("FORM_SUBMISSION_FAILED");
    }
  } catch {
    throw new Error("FORM_SUBMISSION_FAILED");
  }
}
