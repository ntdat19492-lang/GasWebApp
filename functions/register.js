export async function onRequestPost({ request }) {
  try {
    const body = await request.json();
    const { username, password } = body;
    const gasUrl = "https://script.google.com/macros/s/AKfycbwi-porgZXeTWAZ7MoAUXYzqJAL9Eh7wbcUV2ItAnWHLfYeTIQLeLiTkn9RmFEUVhiuMQ/exec";

    const gasRes = await fetch(gasUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "register",
        username: body.username,
        password: body.password
      })
    });

    let gasJson = null;

    try {
      gasJson = await gasRes.json();
    } catch (err) {
      gasJson = { ok: false, error: "GAS không trả JSON", raw: await gasRes.text() };
    }

    // Log bước 2
    const debug2 = { step: "GAS phản hồi", gasJson };

    return new Response(JSON.stringify({
      ok: true,
      debug1,
      debug2
    }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({
      ok: false,
      error: "Lỗi Cloudflare: " + err.message
    }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
