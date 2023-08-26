import React, { useState, useEffect } from 'react';
import { Input, Button, List, Radio } from 'antd';


const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (currentTask.trim() !== '') {
      const newTask = { id: Date.now(), text: currentTask, completed: false };
      setTasks([...tasks, newTask]);
      setCurrentTask('');
    }
  };

  const handleCompleteTask = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };
  const handleDeleteAll = () => {
    setTasks([]);
  };

  const handleDeleteCompleted = () => {
    const activeTasks = tasks.filter(task => !task.completed);
    setTasks(activeTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return false;
  });

  return (
    <div style={{ padding: '20px' }}>
      <h1>Todo App</h1>
      <Button style={{ marginRight: '8px' }} onClick={handleAddTask}>Add Task</Button>
      <Radio.Group value={filter} onChange={(e) => setFilter(e.target.value)}>
        <Radio.Button  style={{ marginRight: '8px' }}  value="all">All</Radio.Button>
        <Radio.Button style={{ marginRight: '8px' }} value="active">Active</Radio.Button>
        <Radio.Button style={{ marginRight: '8px' }} value="completed">Completed</Radio.Button>
      </Radio.Group>
      <Input
        value={currentTask}
        onChange={(e) => setCurrentTask(e.target.value)}
        placeholder="Enter a task"
        onPressEnter={handleAddTask}
      />
      

      

      <List
        dataSource={filteredTasks}
        renderItem={task => (
          <List.Item>
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCompleteTask(task.id)}
              />
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</span>
              <Button style={{ marginLeft: '8px' }}  onClick={() => handleDeleteTask(task.id)} danger>Delete</Button>
            </div>
          </List.Item>
        )}
      />
    
      <Button onClick={handleDeleteAll} danger>Delete All</Button>
    </div>
  );
};

export default TodoApp;
