import React from 'react';

export default function TaskItem({ task, onToggleTask, onDeleteTask }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #eee' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
        {/* Checkbox tích hoắc bỏ tích trạng thái completed */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTask(task.id)} // Báo cho App.jsx đổi trạng thái công việc này
        />
        {/* Nếu completed === true thì gạch ngang chữ (line-through), ngược lại giữ nguyên */}
        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.title}
        </span>
      </label>
      {/* Nút xóa công việc */}
      <button onClick={() => onDeleteTask(task.id)} style={{ padding: '4px 8px', cursor: 'pointer' }}>
        [Xóa]
      </button>
    </div>
  );
}