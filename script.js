// Dán link Google Apps Script mới dành riêng cho Túi Mù vào đây
const GAS_API_URL = "https://script.google.com/macros/s/AKfycbxM5BG8VR2B_4HTuoijLQVT9Cx5yPLKagxMMvDX9St_26HlzmUTKT0_weJnD0glAuOdjA/exec"; 

async function moTuiMu() {
  const inputKey = document.getElementById('inputKey');
  const keyVal = inputKey ? inputKey.value.trim() : '';

  if (!keyVal) {
    alert("Vui lòng nhập Mã Key trước khi mở túi!");
    return;
  }

  const bagElement = document.getElementById('blindBag');

  // 1. Rung lắc ngay
  bagElement.classList.add('shaking');

  try {
    // 2. Gửi request
    const response = await fetch(GAS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ key: keyVal, action: 'openBlindBag' })
    });
    
    const data = await response.json();

    if (data.status === 'success') {
      // 3. Xé bao
      bagElement.classList.remove('shaking');
      bagElement.classList.add('opening');

      // 4. Mở hóa đơn
      setTimeout(() => {
        hienThiHoaDon(data);
        bagElement.classList.remove('opening');
        if (inputKey) inputKey.value = ''; // Xóa ô nhập sau khi mở thành công
      }, 500);

    } else {
      bagElement.classList.remove('shaking');
      alert(data.message || "Key không hợp lệ hoặc đã sử dụng!");
    }

  } catch (error) {
    bagElement.classList.remove('shaking');
    alert("Lỗi kết nối máy chủ!");
  }
}

function hienThiHoaDon(data) {
  const invoiceContainer = document.getElementById('invoicePrint');
  
  invoiceContainer.innerHTML = `
<pre style="white-space: pre-wrap; font-family: monospace; margin:0; font-size: 12px; color: #000;">
========================================
         HÓA ĐƠN DỊCH VỤ & TÚI MÙ
========================================
Mã đơn hàng : ${data.orderId || 'HD' + Date.now()}
Ngày giao   : ${new Date().toLocaleString('vi-VN')}
Khách hàng  : ${data.customerName || 'Khách hàng'}

CHI TIẾT DỊCH VỤ:
1 . Mở Túi Mù Ngẫu Nhiên | Giá: 30,000 VNĐ
 + TK: ${data.account}
 + MK: ${data.password}
${data.mail ? ' + Mail: ' + data.mail : ''}
${data.passMail ? ' + PassMail: ' + data.passMail : ''}

TỔNG CỘNG TIỀN THANH TOÁN : 30,000 VNĐ
========================================
⚠️ LƯU Ý BẢO HÀNH:
1. Đăng nhập, thêm SĐT & ĐỔI PASS ngay.
2. Đúng 30 ngày nhắn lại Shop hỗ trợ gỡ mail temp.
3. Shop bảo hành 100% trong 30 ngày theo thỏa thuận.
========================================
</pre>
  `;

  document.getElementById('resultModal').style.display = 'flex';
}

function dongModal() {
  document.getElementById('resultModal').style.display = 'none';
}
