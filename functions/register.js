export async function onRequestPost({ request }) {
  try {
    const body = await request.json();

    const { username, password } = body;

    // Log: nhận được dữ liệu từ client
    const debug1 = { step: "Cloudflare nhận dữ liệu", body };

    // Gửi sang Google Apps Script
    const gasUrl = "https://script.google.com/macros/s/AKfycbwi-porgZXeTWAZ7MoAUXYzqJAL9Eh7wbcUV2ItAnWHLfYeTIQLeLiTkn9RmFEUVhiuMQ/exec";

    const gasRes = await fetch(gasUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "register",
        username,
        password
      })
    });

    const gasData = await gasRes.json();

    const debug2 = { step: "GAS trả về", gasData };

    return new Response(JSON.stringify({
      ok: true,
      debug1,
      debug2
    }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
