import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

type Task = {
  id: number;
  name: string;
};

const TodoList = () => {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const handleDelete = (id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const handleUpdateTask = (id: number, newName: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, name: newName } : task
      )
    );
  };

  const handleEditClick = (id: number) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setTask(taskToEdit.name);
      setEditTaskId(id);
    }
  };

  const handleUpdateButtonClick = () => {
    if (editTaskId) {
      handleUpdateTask(editTaskId, task);
    } else {
      setTasks(prevTasks => [...prevTasks, { id: Date.now(), name: task }]);
    }
    setTask('');
    setEditTaskId(null);
  };

  return (
    <div className=" bg-sky-800 w-full h-screen flex items-center ">
      <div className="bg-white p-4 rounded-lg shadow-lg  max-w-xl mx-auto  w-[800px]">
        <div className=" bg-cyan-700 text-white p-12 rounded-t-lg text-center ">
          <h1 className="text-5xl font-bold mb-12 ">TODO List</h1>
        </div>
        <div className="p-4">
          <div className="relative mb-4 flex items-center">
            <input
              type="text"
              placeholder="Nueva Tarea"
              className="p-2 flex-grow border-2 border-cyan-700 "
              value={task}
              onChange={handleInputChange}
            />
            <button className="bg-cyan-700 text-white px-8 py-2.5  ml-0" onClick={handleUpdateButtonClick}>
              {editTaskId ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
          <ul className="mt-4">
            {tasks.map(task => (
              <li key={task.id} className="flex justify-between items-center mb-2 bg-cyan-700 p-2.5 text-white ">
                <span className="font-bold">{task.name}</span>
                <div>
                  <FontAwesomeIcon icon={faPenToSquare} className="mr-2 text-white" onClick={() => handleEditClick(task.id)} />
                  <FontAwesomeIcon icon={faTrash} className="mr-2 text-white" onClick={() => handleDelete(task.id)} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
