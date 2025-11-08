import { Routes, Route } from 'react-router-dom';
import Hero from './Components/Hero';
import Menu from './Components/Menu';

export default function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Hero />} />
      <Route path={'/menu'} element={<Menu />} />
    </Routes>
  );
}
