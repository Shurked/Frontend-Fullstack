import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui';

// Navbar para el dashboard
function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Bienvenido, {user?.name}</span>
            <Button 
              variant="danger" 
              size="sm"
              onClick={logout}
            >
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;