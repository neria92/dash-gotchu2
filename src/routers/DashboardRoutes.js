import { Routes, Route } from 'react-router-dom';
import { Navbar } from '../components/ui/Navbar';
import { Missions } from '../components/missions/Missions';

export const DashboardRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route excat path="/missions" element={<Missions/>} />
        <Route excat path="/" element={<Missions/>} />

      </Routes>
    </>
  );
};
