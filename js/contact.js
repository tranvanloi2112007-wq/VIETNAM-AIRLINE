// Form liên hệ ở trang chủ: lưu vào db.contacts để admin xem
const Contact = {
  init() {
    const f = $('#cf'), u = Auth.user(); if (!f) return; if (u) { f.name.value = u.name; f.email.value = u.email }
    f.onsubmit = async e => {
      e.preventDefault(); const { name, phone, email, message } = f;
      const ok = [setErr(name, name.value.trim().length >= 3 ? '' : 'Họ tên tối thiểu 3 ký tự'), setErr(phone, V.phone(phone.value.trim()) ? '' : 'Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)'),
      setErr(email, V.email(email.value.trim()) ? '' : 'Email không hợp lệ'), setErr(message, message.value.trim().length >= 10 ? '' : 'Nội dung tối thiểu 10 ký tự')].every(Boolean); if (!ok) return;
      loading(true); await Api.wait(600); const d = Api.db(); d.contacts = d.contacts || [];
      d.contacts.push({ id: 'C' + Date.now(), name: name.value.trim(), phone: phone.value.trim(), email: email.value.trim(), message: message.value.trim(), userId: u && u.role === 'user' ? u.id : null, createdAt: Date.now(), status: 'Mới' });
      Api.save(d); loading(false); f.reset(); if (u) { f.name.value = u.name; f.email.value = u.email } toast('Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm nhất.')
    }
  }
};
const _home = Pages.home; Pages.home = () => { _home(); Contact.init() };
