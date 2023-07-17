import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthProviders/AuthProvider';

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser();
  };

  return (
    <div>
      <div className="navbar bg-neutral text-neutral-content">
        <Link to="/" className="text-xl btn btn-ghost">
          TaskPro
        </Link>
        <div className="ml-auto flex items-center">
          <Link to="/about" className="hover:bg-[#38bdf8] btn btn-ghost">
            About Us
          </Link>
          <Link to="/dashboard" className="hover:bg-[#38bdf8] btn btn-ghost">
            Dashboard
          </Link>
          {!user ? (
            <Link className="hover:bg-[#38bdf8] me-5 btn btn-ghost" to="/login">Log In</Link>
          ) : (
            <button
              onClick={handleSignOut}
              className="btn btn-ghost text-white px-4 py-2 rounded-md transition-colors duration-200 hover:bg-[#38bdf8]"
            >
              Sign Out
            </button>
          )}
          {user && (
            <span>
              <p className="me-5">{user.email}</p>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
