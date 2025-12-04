export async function onRequestPost(context) {
    try {
        // Lấy body JSON từ client (web app)
        const body = await context.request.json();
        const { name, password } = body;

        // Gửi sang GAS Web App
        const gasUrl = "https://script.google.com/macros/s/AKfycbwi-porgZXeTWAZ7MoAUXYzqJAL9Eh7wbcUV2ItAnWHLfYeTIQLeLiTkn9RmFEUVhiuMQ/exec";

        const gasResponse = await fetch(gasUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, password })
        });

        const result = await gasResponse.json();

        return new Response(JSON.stringify(result), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (err) {
        return new Response(JSON.stringify({ status: "error", message: err.toString() }), {
            headers: { "Content-Type": "application/json" }
        });
    }
}
