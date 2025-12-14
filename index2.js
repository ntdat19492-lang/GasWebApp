document.getElementById('mopopupDangKy').addEventListener('click', function() {
  document.getElementById('dangNhap').style.display = 'none';
  document.getElementById('dangKy').style.display = 'flex';
});

document.getElementById('mopopupDangNhap').addEventListener('click', function() {
  document.getElementById('dangKy').style.display = 'none';
  document.getElementById('dangNhap').style.display = 'flex';
});

document.querySelectorAll('input').forEach(input => {
  input.addEventListener('focus', function() {
    this.style.color = '#999999';  // Đổi màu chữ khi focus
  });
  input.addEventListener('blur', function() {
    if (!this.value) {
      this.style.color = 'white';  // Trả lại màu chữ khi mất focus
    }
  });
});
