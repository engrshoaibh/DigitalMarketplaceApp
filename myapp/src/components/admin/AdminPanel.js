import { Link } from 'react-router-dom';

function AdminPanel() {
  return (
    <div className="admin-panel flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Admin Panel</h1>
      <nav className="space-x-2">
        <Link
          to="/adminpanel/login"
          className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Admin Login
        </Link>
        <Link
          to="/adminpanel/signup"
          className="btn btn-primary bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Add Admin
        </Link>
      </nav>
    </div>
  );
}

export default AdminPanel;
