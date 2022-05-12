import { Routes, Route } from 'react-router-dom';
import { Navbar } from '../components/ui/Navbar';
import { Missions } from '../components/missions/Missions';
import { CreateMission } from '../components/missions/createMission/CreateMission';
import { Appeal } from '../components/appeal/Appeal';
import { EditMission } from '../components/missions/editMission/EditMission';
import { AppealDetails } from '../components/appeal/AppealDetails';
import { Captures } from '../components/captures/Captures';
import { CaptureDetails } from '../components/captures/CaptureDetails';
import { UserList } from '../components/users/UserList';
import { ContentReports } from '../components/contentReports/ContentReports';
import { UserDetails } from '../components/users/UserDetails';

export const DashboardRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route excat path="/missions" element={<Missions />} />
        <Route excat path="/missions/:id" element={<EditMission />} />
        <Route excat path="/appeal/:id" element={<AppealDetails />} />
        <Route excat path="/createMission" element={<CreateMission />} />
        <Route excat path="/appeal" element={<Appeal />} />
        <Route excat path="/captures" element={<Captures />} />
        <Route excat path="/captures/:id" element={<CaptureDetails />} />
        <Route excat path="/users/:id" element={<UserDetails />} />
        <Route excat path="/users" element={<UserList />} />
        <Route excat path="/contentReports" element={<ContentReports />} />
        <Route excat path="/" element={<Missions />} />

      </Routes>
    </>
  );
};
