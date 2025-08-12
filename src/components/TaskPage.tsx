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
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [editDate, setEditDate] = useState('');

  const addTask = () => {
    if (input.trim() && date) {
      setTasks([...tasks, { id: Date.now(), text: input.trim(), date }]);
      setInput('');
      setDate('');
    }
  };


  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (editId === id) {
      setEditId(null);
      setEditText('');
      setEditDate('');
    }
  };

  const startEdit = (task: Task) => {
    setEditId(task.id);
    setEditText(task.text);
    setEditDate(task.date);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText('');
    setEditDate('');
  };

  const saveEdit = (id: number) => {
    if (editText.trim() && editDate) {
      setTasks(tasks.map(task => task.id === id ? { ...task, text: editText.trim(), date: editDate } : task));
      setEditId(null);
      setEditText('');
      setEditDate('');
    }
  };

  return (
    <div className="bg-gradient-to-br from-neutral-900/90 to-neutral-800/80 rounded-2xl shadow-2xl p-8 max-w-xl mx-auto border border-neutral-800 backdrop-blur-md">
      <h2 className="text-3xl font-extrabold mb-6 flex items-center gap-2 tracking-tight">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="text-primary"><rect width="100%" height="100%" rx="6" fill="#6366f1"/><path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Task Manager
      </h2>
      <form
        className="flex flex-col sm:flex-row gap-3 mb-6 items-stretch bg-neutral-950/60 rounded-xl p-4 shadow-inner border border-neutral-800"
        onSubmit={e => { e.preventDefault(); addTask(); }}
      >
        <div className="relative flex-1 flex items-center">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          <input
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-neutral-800 text-neutral-100 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all placeholder:text-neutral-500"
            type="text"
            placeholder="Add a new task..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTask()}
            autoComplete="off"
          />
        </div>
        <DateInput
          className="w-36 rounded-lg border-neutral-700 focus:ring-2 focus:ring-primary/60 transition-all"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <Button
          onClick={addTask}
          variant="default"
          className="rounded-lg px-6 font-semibold shadow-md bg-gradient-to-r from-primary to-indigo-500 hover:from-indigo-500 hover:to-primary transition-all"
          type="submit"
        >
          Add
        </Button>
      </form>
      <Separator className="mb-4" />
      <ul className="space-y-2">
        {tasks.length === 0 && <li className="text-neutral-500">No tasks yet.</li>}
        {tasks.map(task => (
          <li
            key={task.id}
            className="flex items-center justify-between bg-neutral-800/70 backdrop-blur-md rounded-2xl px-5 py-3 shadow-lg border border-neutral-700/60 transition-all hover:scale-[1.025] hover:shadow-xl group mb-1"
            style={{ boxShadow: '0 4px 24px 0 rgba(80,80,120,0.10)' }}
          >
            {editId === task.id ? (
              <>
                <div className="flex flex-col sm:flex-row gap-2 sm:items-center flex-1">
                  <input
                    className="flex-1 px-3 py-2 rounded-lg bg-neutral-700/80 text-neutral-100 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all"
                    type="text"
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                  />
                  <DateInput
                    className="w-32 rounded-lg border-neutral-600 focus:ring-2 focus:ring-primary/60 transition-all"
                    value={editDate}
                    onChange={e => setEditDate(e.target.value)}
                  />
                </div>
                <div className="flex gap-1 ml-2">
                  <Button size="sm" variant="default" className="rounded-lg px-4" onClick={() => saveEdit(task.id)}>Save</Button>
                  <Button size="sm" variant="secondary" className="rounded-lg px-4" onClick={cancelEdit}>Cancel</Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center flex-1 gap-1">
                  <span className="font-medium text-base tracking-tight text-white group-hover:text-primary transition-colors">
                    {task.text}
                  </span>
                  <span className="ml-0 sm:ml-4 text-xs text-white group-hover:text-indigo-400 transition-colors">
                    <svg className="inline mr-1 -mt-0.5" width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="5" fill="#6366f1"/><path d="M8 11h8M8 15h5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                    {task.date}
                  </span>
                </div>
                <div className="flex gap-1 ml-2">
                  <Button size="sm" variant="outline" className="rounded-lg px-4 border-primary/40 group-hover:border-primary" onClick={() => startEdit(task)}>Edit</Button>
                  <Button variant="destructive" size="sm" className="rounded-lg px-4" onClick={() => removeTask(task.id)}>Remove</Button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskPage;
