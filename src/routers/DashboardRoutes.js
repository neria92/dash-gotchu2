import { Routes, Route } from 'react-router-dom';
import { Navbar } from '../components/ui/Navbar';
import { Missions } from '../components/missions/Missions';
import { CreateMission } from '../components/missions/createMission/CreateMission';
import { Appeal } from '../components/appeal/Appeal';

export const DashboardRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route excat path="/missions" element={<Missions/>} />
        <Route excat path="/createMission" element={<CreateMission/>} />
        <Route excat path="/appeal" element={<Appeal/>} />
        <Route excat path="/" element={<Missions/>} />

      </Routes>
    </>
  );
};
