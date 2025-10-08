import { Routes, Route } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import ContentModeration from './components/ContentModeration';
import ChatMonitoring from './components/ChatMonitoring';
import Subscriptions from './components/Subscriptions';
import VerificationManagement from './components/VerificationManagement';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminPanel />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="content" element={<ContentModeration />} />
        <Route path="chat" element={<ChatMonitoring />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="verification" element={<VerificationManagement />} />
      </Route>
    </Routes>
  );
}
