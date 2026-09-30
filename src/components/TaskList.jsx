import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({
  tasks,
  filter,
  onFilterChange,
  searchTerm,
  onSearchChange,
  onToggleTask,
  onDeleteTask
}) {
  return (
    <div>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        
        <select value={filter} onChange={(e) => onFilterChange(e.target.value)} style={{ padding: '8px' }}>
          <option value="all">Tất cả ▼</option>
          <option value="uncompleted">Chưa làm</option>
          <option value="completed">Hoàn thành</option>
        </select>

        
        <input
          type="text"
          placeholder="Tìm kiếm................"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ flex: 1, padding: '8px' }}
        />
      </div>

      
      <div>
        {tasks.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>Không tìm thấy công việc nào</p>
        ) : (
          
          tasks.map((task) => (
            <TaskItem
              key={task.id} 
              task={task}
              onToggleTask={onToggleTask}
              onDeleteTask={onDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}
