// DÁN LINK GOOGLE APPS SCRIPT CỦA BẠN VÀO GIỮA 2 DẤU NGOẶC KÉP NÀY:
const GAS_API_URL = "https://script.google.com/macros/s/AKfycbx.../exec";

function moTuiMu(bagIndex) {
  const keyInput = document.getElementById('inputKey').value.trim();

  if (!keyInput) {
    alert("Vui lòng nhập Mã Key trước khi mở túi!");
    return;
  }

  // Gọi API kiểm tra Key và lấy Acc
  fetch(GAS_API_URL, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ key: keyInput })
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      hienThiHoaDon(data);
    } else {
      alert(data.message || 'Mã Key không hợp lệ hoặc đã dùng!');
    }
  })
  .catch(error => {
    console.error('Lỗi:', error);
    alert('Không thể kết nối đến máy chủ! Vui lòng kiểm tra lại.');
  });
}

function hienThiHoaDon(data) {
  const invoiceContainer = document.getElementById('invoicePrint');
  
  // 1. Pháo hoa
  if (typeof confetti === 'function') {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
  }

  // 2. Tiếng vỗ tay
  try {
    const victoryAudio = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
    victoryAudio.volume = 0.6;
    victoryAudio.play();
  } catch (e) {}

  // 3. Hiển thị Popup Chúc Mừng chuyên cho Acc TTT
  invoiceContainer.innerHTML = `
    <div style="text-align: center; margin-bottom: 12px;">
      <h2 style="color: #ff0055; font-size: 20px; margin: 0; text-transform: uppercase;">
        🎉 CHÚC MỪNG BẠN XÉ TRÚNG 🎉
      </h2>
      <div style="font-size: 16px; color: #d63031; font-weight: bold; margin-top: 6px; background: #ffeaa7; padding: 8px; border-radius: 6px; border: 2px dashed #fdcb6e;">
        🌟 ${data.skinName || 'NICK LQMB TTT VIP'} 🌟
      </div>
    </div>

<pre style="white-space: pre-wrap; font-family: monospace; margin:0; font-size: 12px; color: #000; background: #f8f9fa; padding: 10px; border-radius: 6px; border: 1px dashed #ccc;">
========================================
       THÔNG TIN TÀI KHOẢN TÚI MÙ
========================================
Mã đơn hàng   : ${data.orderId || 'HD' + Date.now()}
Trạng thái    : ĐÃ XÁC NHẬN KEY
Loại Tài Khoản: TTT (ĐÃ ĐẦY ĐỦ THÔNG TIN)

CHI TIẾT PHẦN THƯỞNG:
 + Trang phục  : ${data.skinName || 'Acc Ngẫu Nhiên'}
 + Tài khoản   : ${data.account}
 + Mật khẩu    : ${data.password}

CẦN THU THÊM   : 0 VNĐ
========================================
⚠️ LƯU Ý DÙNG ACC TTT:
1. Đăng nhập vào game trải nghiệm ngay.
2. Không cần thêm mail/SĐT tránh bị dính checkpoint.
3. Shop bảo hành 100% tài khoản chuẩn TTT.
========================================
</pre>
  `;

  document.getElementById('resultModal').style.display = 'flex';
}

function dongModal() {
  document.getElementById('resultModal').style.display = 'none';
}
