export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      message: "Telegram Join Request Tracker is running"
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      message: "Method Not Allowed"
    });
  }

  try {
    const update = req.body;

    // Sirf REAL Telegram Join Request ko detect karega
    if (update && update.chat_join_request) {
      const request = update.chat_join_request;

      console.log("REAL TELEGRAM JOIN REQUEST:", {
        request_id: request.user_chat_id,
        user_id: request.from?.id,
        username: request.from?.username || null,
        chat_id: request.chat?.id,
        date: request.date,
        invite_link: request.invite_link?.invite_link || null
      });
    }

    return res.status(200).json({
      ok: true
    });

  } catch (error) {
    console.error("Webhook Error:", error);

    return res.status(500).json({
      ok: false,
      error: "Internal Server Error"
    });
  }
}
