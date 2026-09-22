import type { NotifyType } from "@/lib/notify-types";

export type NotifyResult =
  | { ok: true }
  | { ok: false; error: string };

type NotifyFields = {
  type: NotifyType;
  email: string;
  name?: string;
  phone?: string;
  message?: string;
  role?: string;
  service?: string;
  resume?: File | null;
};

export async function submitNotify(
  fields: NotifyFields,
): Promise<NotifyResult> {
  try {
    let response: Response;

    if (fields.resume) {
      const form = new FormData();
      form.set("type", fields.type);
      form.set("email", fields.email);
      if (fields.name) form.set("name", fields.name);
      if (fields.phone) form.set("phone", fields.phone);
      if (fields.message) form.set("message", fields.message);
      if (fields.role) form.set("role", fields.role);
      if (fields.service) form.set("service", fields.service);
      form.set("resume", fields.resume);

      response = await fetch("/api/notify", {
        method: "POST",
        body: form,
      });
    } else {
      response = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: fields.type,
          email: fields.email,
          name: fields.name,
          phone: fields.phone,
          message: fields.message,
          role: fields.role,
          service: fields.service,
        }),
      });
    }

    const data = (await response.json().catch(() => null)) as {
      ok?: boolean;
      error?: string;
    } | null;

    if (!response.ok || !data?.ok) {
      return {
        ok: false,
        error: data?.error || "Something went wrong. Please try again.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Network error. Please check your connection and try again.",
    };
  }
}
