/* eslint-env node */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, message, meta } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Nome, email e mensagem são obrigatórios." });
  }

  const isDev = process.env.NODE_ENV !== "production";
  const webhook = isDev ? process.env.N8N_CONTACT_WEBHOOK_DEV : process.env.N8N_CONTACT_WEBHOOK;
  const secret = process.env.N8N_CONTACT_SECRET;

  if (!webhook || !secret) {
    return res.status(500).json({ error: "Webhook não configurado." });
  }

  try {
    const credentials = Buffer.from(`webhook:${secret}`).toString("base64");

    const r = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify({
        name,
        email,
        message,
        description: message,
        meta,
      }),
    });

    const payload = await r.json().catch(() => ({}));
    if (!r.ok) {
      return res.status(502).json({
        error: payload?.error || `Erro n8n: ${r.status} ${r.statusText}`,
      });
    }

    return res.status(200).json({ ok: true, payload });
  } catch (err) {
    return res.status(502).json({
      error: "Falha ao conectar com n8n.",
      details: err?.message,
    });
  }
}
