import React, { useState, useMemo, useCallback, useContext } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import useLocalStorage from './hooks/useLocalStorage';
import { ThemeContext } from './context/ThemeContext';
import { initialTasks } from './data/tasks';

export default function App() {
  // Lấy theme từ Context
  const { darkMode } = useContext(ThemeContext);

  // 1. State danh sách công việc (Được đồng bộ với Local Storage)
  const [tasks, setTasks] = useLocalStorage('tasks', initialTasks);

  // 2. State cho Bộ lọc dropdown và Ô tìm kiếm
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // 3. Hàm Thêm công việc mới (dùng useCallback tối ưu hiệu năng)
  const handleAddTask = useCallback((title) => {
    setTasks((prev) => [{ id: Date.now(), title, completed: false }, ...prev]); // Thêm vào đầu mảng
  }, [setTasks]);

  // 4. Hàm Chuyển đổi trạng thái Đã làm / Chưa làm
  const handleToggleTask = useCallback((id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }, [setTasks]);

  // 5. Hàm Xóa công việc
  const handleDeleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, [setTasks]);

  // 6. THỐNG KÊ (Dùng useMemo để chỉ tính toán lại khi mảng `tasks` thay đổi)
  const totalCount = tasks.length;
  const completedCount = useMemo(() => tasks.filter((t) => t.completed).length, [tasks]);
  const uncompletedCount = totalCount - completedCount;

  // 7. LỌC DANH SÁCH (Kết hợp cả Filter dropdown và Ô tìm kiếm)
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Điều kiện Lọc theo Trạng thái
      const matchesFilter =
        filter === 'all' ? true : filter === 'completed' ? task.completed : !task.completed;
      
      // Điều kiện Tìm kiếm tên (chuyển về chữ thường toLowerCase để không phân biệt HOA/thường)
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());

      // Thỏa mãn đồng thời cả 2 điều kiện
      return matchesFilter && matchesSearch;
    });
  }, [tasks, filter, searchTerm]);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: darkMode ? '#222' : '#f9f9f9',
      color: darkMode ? '#fff' : '#000',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '500px',
        margin: '0 auto',
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: darkMode ? '#333' : '#fff'
      }}>
        <Header />
        <TaskForm onAddTask={handleAddTask} />
        
        {/* Dòng Thống kê số lượng */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', margin: '15px 0', fontSize: '14px' }}>
          <span>Tổng: {totalCount}</span>
          <span>Chưa làm: {uncompletedCount}</span>
          <span>Hoàn thành: {completedCount}</span>
        </div>

        {/* Danh sách Task đã qua bộ lọc */}
        <TaskList
          tasks={filteredTasks}
          filter={filter}
          onFilterChange={setFilter}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
        />
      </div>
    </div>
  );
}