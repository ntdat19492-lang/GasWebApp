export async function onRequestPost({ request }) {
  try {
    // Đọc dữ liệu gửi từ client
    const body = await request.json();

    // Lấy thông tin từ body
    const { username, password } = body;

    // Kiểm tra nếu tên đăng nhập và mật khẩu hợp lệ (ví dụ: không trống)
    if (!username || !password) {
      return new Response(JSON.stringify({
        ok: false,
        message: "Tên đăng nhập và mật khẩu không được để trống"
      }), {
        headers: { "Content-Type": "application/json" },
        status: 400 // Bad Request
      });
    }

    // Gửi request tới Google Apps Script (GAS)
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

    // Đọc phản hồi từ GAS
    let gasJson = null;

    try {
      gasJson = await gasRes.json();  // Lấy dữ liệu JSON từ phản hồi của GAS
    } catch (err) {
      gasJson = { ok: false, error: "GAS không trả JSON", raw: await gasRes.text() };
    }

    // Trả về kết quả từ GAS cho client
    return new Response(JSON.stringify(gasJson), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    // Lỗi xử lý
    console.error("Lỗi khi xử lý request:", error);
    return new Response(JSON.stringify({
      ok: false,
      message: "Đã xảy ra lỗi, vui lòng thử lại sau."
    }), {
      headers: { "Content-Type": "application/json" },
      status: 500 // Internal Server Error
    });
  }
}
