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

    // Giả sử bạn sẽ làm gì đó với username và password, ví dụ: lưu vào Google Sheets, kiểm tra trùng lặp, etc.
    // Trong ví dụ này, chúng ta giả sử quá trình đăng ký thành công

    return new Response(JSON.stringify({
      ok: true,
      message: "Đăng ký thành công"
    }), {
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
