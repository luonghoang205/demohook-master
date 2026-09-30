import { useState, useEffect } from 'react';

export default function useLocalStorage(key, initialValue) {
  // 1. Khai báo state và đọc dữ liệu ban đầu từ Local Storage
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key); // Tìm dữ liệu theo key
      return item ? JSON.parse(item) : initialValue; // Nếu có thì giải mã JSON, không thì lấy giá trị mặc định
    } catch (error) {
      console.error(error);
      return initialValue; // Tránh vỡ app nếu Local Storage bị lỗi
    }
  });

  // 2. Tự động lưu lại vào Local Storage mỗi khi key hoặc value thay đổi
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value)); // Mã hóa dữ liệu thành chuỗi JSON rồi lưu
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  // 3. Trả về mảng gồm [giá_trị, hàm_cập_nhật] giống hệt useState
  return [value, setValue];
}