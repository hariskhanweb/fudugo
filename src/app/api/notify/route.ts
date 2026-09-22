import { NextResponse } from "next/server";
import { sendNotification, type NotifyPayload } from "@/lib/mail";
import type { NotifyType } from "@/lib/notify-types";

export const runtime = "nodejs";

const ALLOWED_TYPES: NotifyType[] = [
  "contact",
  "career",
  "seo",
  "newsletter",
];

const MAX_RESUME_BYTES = 5 * 1024 * 1024;

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function asString(value: FormDataEntryValue | null | undefined) {
  return typeof value === "string" ? value.trim() : "";
}

function parsePayloadFromJson(body: Record<string, unknown>): NotifyPayload {
  const type = String(body.type ?? "") as NotifyType;
  if (!ALLOWED_TYPES.includes(type)) {
    throw new Error("Invalid notification type.");
  }

  const email = String(body.email ?? "").trim();
  if (!email || !isEmail(email)) {
    throw new Error("A valid email is required.");
  }

  return {
    type,
    email,
    name: String(body.name ?? "").trim() || undefined,
    phone: String(body.phone ?? "").trim() || undefined,
    message: String(body.message ?? "").trim() || undefined,
    role: String(body.role ?? "").trim() || undefined,
    service: String(body.service ?? "").trim() || undefined,
    resumeName: String(body.resumeName ?? "").trim() || undefined,
  };
}

function parsePayloadFromForm(form: FormData): {
  payload: NotifyPayload;
  resume?: File;
} {
  const type = asString(form.get("type")) as NotifyType;
  if (!ALLOWED_TYPES.includes(type)) {
    throw new Error("Invalid notification type.");
  }

  const email = asString(form.get("email"));
  if (!email || !isEmail(email)) {
    throw new Error("A valid email is required.");
  }

  const resumeEntry = form.get("resume");
  const resume =
    resumeEntry instanceof File && resumeEntry.size > 0
      ? resumeEntry
      : undefined;

  return {
    payload: {
      type,
      email,
      name: asString(form.get("name")) || undefined,
      phone: asString(form.get("phone")) || undefined,
      message: asString(form.get("message")) || undefined,
      role: asString(form.get("role")) || undefined,
      service: asString(form.get("service")) || undefined,
      resumeName: resume?.name || asString(form.get("resumeName")) || undefined,
    },
    resume,
  };
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    let payload: NotifyPayload;
    let attachment:
      | { filename: string; content: Buffer; contentType?: string }
      | undefined;

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      const parsed = parsePayloadFromForm(form);
      payload = parsed.payload;

      if (parsed.resume) {
        if (parsed.resume.size > MAX_RESUME_BYTES) {
          return NextResponse.json(
            { ok: false, error: "Resume must be 5MB or smaller." },
            { status: 400 },
          );
        }
        const buffer = Buffer.from(await parsed.resume.arrayBuffer());
        attachment = {
          filename: parsed.resume.name,
          content: buffer,
          contentType: parsed.resume.type || undefined,
        };
      }
    } else {
      const body = (await request.json()) as Record<string, unknown>;
      payload = parsePayloadFromJson(body);
    }

    if (payload.type === "contact" && !payload.message) {
      return NextResponse.json(
        { ok: false, error: "Message is required." },
        { status: 400 },
      );
    }

    if (payload.type === "career" && !payload.name) {
      return NextResponse.json(
        { ok: false, error: "Name is required." },
        { status: 400 },
      );
    }

    await sendNotification(payload, attachment);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to send notification.";
    const isConfig = message.startsWith("Missing environment variable");
    console.error("[notify]", message);
    return NextResponse.json(
      {
        ok: false,
        error: isConfig
          ? "Email is not configured yet. Add SMTP credentials on the server."
          : message,
      },
      { status: isConfig ? 503 : 500 },
    );
  }
}
