import React from 'react';

export default function TaskItem({ task, onToggleTask, onDeleteTask }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #eee' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
        
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTask(task.id)} 
        />
        
        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.title}
        </span>
      </label>
      
      <button onClick={() => onDeleteTask(task.id)} style={{ padding: '4px 8px', cursor: 'pointer' }}>
        [Xóa]
      </button>
    </div>
  );
}
