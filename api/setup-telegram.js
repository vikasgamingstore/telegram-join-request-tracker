export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      ok: false,
      message: "Method Not Allowed"
    });
  }

  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;

    if (!token) {
      return res.status(500).json({
        ok: false,
        message: "TELEGRAM_BOT_TOKEN is not configured"
      });
    }

    const webhookUrl =
      "https://telegram-join-request-tracker.vercel.app/api/telegram-webhook";

    const telegramUrl =
      `https://api.telegram.org/bot${token}/setWebhook?url=${encodeURIComponent(webhookUrl)}`;

    const response = await fetch(telegramUrl);
    const result = await response.json();

    return res.status(200).json({
      ok: result.ok,
      telegram: result
    });

  } catch (error) {
    console.error("Setup Error:", error);

    return res.status(500).json({
      ok: false,
      message: "Webhook setup failed"
    });
  }
}
