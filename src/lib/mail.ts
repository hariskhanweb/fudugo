import nodemailer from "nodemailer";
import type { NotifyType } from "@/lib/notify-types";

export type { NotifyType };

export type NotifyPayload = {
  type: NotifyType;
  name?: string;
  email: string;
  phone?: string;
  message?: string;
  role?: string;
  service?: string;
  resumeName?: string;
};

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export function getMailConfig() {
  const host = process.env.SMTP_HOST?.trim() || "smtp.zoho.com";
  const port = Number(process.env.SMTP_PORT ?? "465");
  const secure =
    process.env.SMTP_SECURE?.trim() === "true" ||
    (!process.env.SMTP_SECURE && port === 465);
  const user = requiredEnv("SMTP_USER");
  const pass = requiredEnv("SMTP_PASS");
  const from = process.env.MAIL_FROM?.trim() || user;
  const to = process.env.MAIL_TO?.trim() || "info@fudugo.com";
  const toHr = process.env.MAIL_TO_HR?.trim() || "hr@fudugo.com";

  return { host, port, secure, user, pass, from, to, toHr };
}

export function createTransport() {
  const { host, port, secure, user, pass } = getMailConfig();
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function subjectFor(payload: NotifyPayload) {
  switch (payload.type) {
    case "contact":
      return `New contact message from ${payload.name || payload.email}`;
    case "career":
      return `Career application: ${payload.role || "Open application"} — ${payload.name || payload.email}`;
    case "seo":
      return `SEO inquiry: ${payload.service || "General"} — ${payload.name || payload.email}`;
    case "newsletter":
      return `Newsletter signup: ${payload.email}`;
  }
}

function recipientFor(payload: NotifyPayload, to: string, toHr: string) {
  return payload.type === "career" ? toHr : to;
}

function bodyLines(payload: NotifyPayload) {
  const lines: Array<[string, string]> = [["Type", payload.type]];
  if (payload.name) lines.push(["Name", payload.name]);
  lines.push(["Email", payload.email]);
  if (payload.phone) lines.push(["Phone", payload.phone]);
  if (payload.role) lines.push(["Role", payload.role]);
  if (payload.service) lines.push(["Service", payload.service]);
  if (payload.resumeName) lines.push(["Resume", payload.resumeName]);
  if (payload.message) lines.push(["Message", payload.message]);
  return lines;
}

export async function sendNotification(
  payload: NotifyPayload,
  attachment?: { filename: string; content: Buffer; contentType?: string },
) {
  const { from, to, toHr } = getMailConfig();
  const transport = createTransport();
  const lines = bodyLines(payload);

  const text = lines.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;line-height:1.5;color:#111">
      <h2 style="margin:0 0 16px">${escapeHtml(subjectFor(payload))}</h2>
      <table style="border-collapse:collapse;width:100%;max-width:640px">
        ${lines
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:8px 12px;border:1px solid #e5e5e5;font-weight:600;width:140px;vertical-align:top">${escapeHtml(label)}</td>
            <td style="padding:8px 12px;border:1px solid #e5e5e5;white-space:pre-wrap">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join("")}
      </table>
    </div>
  `;

  await transport.sendMail({
    from,
    to: recipientFor(payload, to, toHr),
    replyTo: payload.email,
    subject: subjectFor(payload),
    text,
    html,
    attachments: attachment
      ? [
          {
            filename: attachment.filename,
            content: attachment.content,
            contentType: attachment.contentType,
          },
        ]
      : undefined,
  });
}
