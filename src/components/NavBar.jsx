import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth.js';
import './NavBar.css';

function NavBar() {
    const { auth, setAuth } = useAuth();

    const handleLogout = () => {
        window.localStorage.removeItem('token');
        setAuth({ token: null });
    };

    return (
        <div>
            <nav className="navbar">
                <div className="nav-container">
                    <div className="nav-brand">
                        <Link to="/">FundRaizr</Link>
                    </div>
                    <div className="nav-links">
                        <Link to="/">Home</Link>
                        {auth.token ? (
                            <>
                                <Link to="/create-fundraiser">Create Fundraiser</Link>
                                <Link to="/profile">My Profile</Link>
                                <Link to="/" onClick={handleLogout} className="logout-btn">
                                    Log Out
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/register" className="register-btn">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}

export default NavBar;