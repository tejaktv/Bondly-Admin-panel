import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';

function AppContent() {
  const { admin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-white mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return admin ? <AdminPanel /> : <Login />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
