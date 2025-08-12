import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Button } from './components/ui/button';
import { Separator } from './components/ui/separator';
import TaskPage from './components/TaskPage';
import AboutPage from './components/AboutPage';

function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center py-8">
      <nav className="flex gap-4 mb-8">
        <Link to="/">
          <Button variant={location.pathname === '/' ? 'secondary' : 'outline'} className='text-black'>Tasks</Button>
        </Link>
        <Link to="/about">
          <Button variant={location.pathname === '/about' ? 'secondary' : 'outline'} className='text-black'>About</Button>
        </Link>
      </nav>
      <Separator className="w-full max-w-xl mb-8" />
      <div className="w-full max-w-xl">
        <Routes>
          <Route path="/" element={<TaskPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
