import React, { useState } from 'react';

export default function TaskForm({ onAddTask }) {
  // State lưu giá trị chữ đang gõ trong ô input
  const [title, setTitle] = useState('');

  // Xử lý khi nhấn nút "Thêm" hoặc nhấn Enter
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn trang web reload mặc định của form
    if (!title.trim()) return; // Kiểm tra nếu ô input rỗng/khoảng trắng thì dừng

    onAddTask(title.trim()); // Gọi hàm từ App.jsx gửi tên công việc lên
    setTitle(''); // Xóa sạch chữ trong ô input sau khi thêm xong
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
      <input
        type="text"
        placeholder="Nhập tên công việc........."
        value={title} // Lắng nghe giá trị từ state
        onChange={(e) => setTitle(e.target.value)} // Bắt sự kiện gõ phím để cập nhật state
        style={{ flex: 1, padding: '8px' }}
      />
      <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer' }}>Thêm</button>
    </form>
  );
}