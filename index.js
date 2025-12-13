// JavaScript để thay đổi giữa Đăng Nhập và Đăng Ký

// Lắng nghe sự kiện click vào nút chuyển sang Đăng Ký
document.getElementById('mopopupDangKy').addEventListener('click', function() {
  // Ẩn phần Đăng Nhập
  document.getElementById('dangNhap').style.display = 'none';

  // Hiển thị phần Đăng Ký
  document.getElementById('dangKy').style.display = 'flex';
});

// Lắng nghe sự kiện click vào nút chuyển sang Đăng Nhập
document.getElementById('mopopupDangNhap').addEventListener('click', function() {
  // Ẩn phần Đăng Ký
  document.getElementById('dangKy').style.display = 'none';

  // Hiển thị phần Đăng Nhập
  document.getElementById('dangNhap').style.display = 'flex';
});
