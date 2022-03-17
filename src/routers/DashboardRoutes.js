import { Routes, Route } from 'react-router-dom';
import { Navbar } from '../components/ui/Navbar';
import { Missions } from '../components/missions/Missions';
import { CreateMission } from '../components/missions/CreateMission';

export const DashboardRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route excat path="/missions" element={<Missions/>} />
        <Route excat path="/createMission" element={<CreateMission/>} />
        <Route excat path="/" element={<Missions/>} />

      </Routes>
    </>
  );
};
