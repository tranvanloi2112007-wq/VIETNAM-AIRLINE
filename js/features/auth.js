// Xử lý trạng thái đăng nhập & đăng xuất
export const initAuth = () => {
  const guestGroup = document.querySelector('#guestGroup')
  const userGroup = document.querySelector('#userGroup')
  const userEmail = document.querySelector('#userEmail')
  const logoutBtn = document.querySelector('#logoutBtn')

  const token = localStorage.getItem('token')
  const userStr = localStorage.getItem('user')

  if (token && userStr) {
    try {
      const user = JSON.parse(userStr)
      if (guestGroup) guestGroup.style.display = 'none'
      if (userGroup) userGroup.style.display = 'flex'
      if (userEmail) userEmail.textContent = user.name || user.email
    } catch (e) {
      console.error('Lỗi đọc dữ liệu người dùng:', e)
    }
  } else {
    if (guestGroup) guestGroup.style.display = 'flex'
    if (userGroup) userGroup.style.display = 'none'
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      alert('Bạn đã đăng xuất thành công!')
      window.location.reload()
    })
  }
}
