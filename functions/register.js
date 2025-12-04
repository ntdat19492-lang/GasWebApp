export async function onRequestPost(context) {
  try {
    const body = await context.request.json();

    const res = await fetch(context.env.https://script.google.com/macros/s/AKfycbwi-porgZXeTWAZ7MoAUXYzqJAL9Eh7wbcUV2ItAnWHLfYeTIQLeLiTkn9RmFEUVhiuMQ/exec, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(JSON.stringify({ status: "error", message: err.toString() }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
