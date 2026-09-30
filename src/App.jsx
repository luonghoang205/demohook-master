import React, { useState, useMemo, useCallback, useContext } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import useLocalStorage from './hooks/useLocalStorage';
import { ThemeContext } from './context/ThemeContext';
import { initialTasks } from './data/tasks';

export default function App() {
  
  const { darkMode } = useContext(ThemeContext);

  
  const [tasks, setTasks] = useLocalStorage('tasks', initialTasks);

  
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  
  const handleAddTask = useCallback((title) => {
    setTasks((prev) => [{ id: Date.now(), title, completed: false }, ...prev]); 
  }, [setTasks]);

  
  const handleToggleTask = useCallback((id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }, [setTasks]);

  
  const handleDeleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, [setTasks]);

  
  const totalCount = tasks.length;
  const completedCount = useMemo(() => tasks.filter((t) => t.completed).length, [tasks]);
  const uncompletedCount = totalCount - completedCount;

  
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      
      const matchesFilter =
        filter === 'all' ? true : filter === 'completed' ? task.completed : !task.completed;
      
      
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());

      
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
        
       
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', margin: '15px 0', fontSize: '14px' }}>
          <span>Tổng: {totalCount}</span>
          <span>Chưa làm: {uncompletedCount}</span>
          <span>Hoàn thành: {completedCount}</span>
        </div>

        
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
