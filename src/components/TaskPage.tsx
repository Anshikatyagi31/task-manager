import React, { useState } from 'react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { DateInput } from './ui/date-input';

interface Task {
  id: number;
  text: string;
  date: string;
}

const TaskPage: React.FC = () => {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');
  const [date, setDate] = useState('');

  const addTask = () => {
    if (input.trim() && date) {
      setTasks([...tasks, { id: Date.now(), text: input.trim(), date }]);
      setInput('');
      setDate('');
    }
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="bg-neutral-900 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Task Manager</h2>
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 px-3 py-2 rounded bg-neutral-800 text-neutral-100 border border-neutral-700 focus:outline-none"
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
        />
        <DateInput
          className="w-36"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <Button onClick={addTask} variant="default">Add</Button>
      </div>
      <Separator className="mb-4" />
      <ul className="space-y-2">
        {tasks.length === 0 && <li className="text-neutral-500">No tasks yet.</li>}
        {tasks.map(task => (
          <li key={task.id} className="flex items-center justify-between bg-neutral-800 rounded px-3 py-2">
            <div>
              <span>{task.text}</span>
              <span className="ml-4 text-xs text-neutral-400">{task.date}</span>
            </div>
            <Button variant="destructive" size="sm" onClick={() => removeTask(task.id)}>Remove</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskPage;
