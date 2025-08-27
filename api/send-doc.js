// /* eslint-env node */
// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     res.setHeader("Allow", "POST");
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   const { email, description, meta } = req.body || {};
//   if (!email || !description) {
//     return res.status(400).json({ error: "Email e descrição são obrigatórios." });
//   }

//   const isDev = process.env.NODE_ENV !== "production";
//   const webhook = isDev ? process.env.N8N_WEBHOOK_DEV : process.env.N8N_WEBHOOK;
//   const secret = process.env.N8N_SECRET;

//   if (!webhook || !secret) {
//     return res.status(500).json({ error: "Webhook não configurado." });
//   }

//   try {
//     // Basic Authentication para n8n
//     const credentials = Buffer.from(`webhook:${secret}`).toString("base64");

//     const r = await fetch(webhook, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Basic ${credentials}`,
//       },
//       body: JSON.stringify({ email, description, meta }),
//     });

//     const payload = await r.json().catch(() => ({}));
//     if (!r.ok) {
//       return res.status(502).json({
//         error: payload.error || `Erro n8n: ${r.status} ${r.statusText}`,
//       });
//     }

//     return res.status(200).json({ ok: true, payload });
//   } catch (err) {
//     return res.status(502).json({
//       error: "Falha ao conectar com n8n.",
//       details: err.message,
//     });
//   }
// }
