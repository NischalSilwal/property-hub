import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import { Dialog } from './Dialog';

export function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const location = useLocation();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    const handleLogout = () => {
        setShowLogoutDialog(true);
    };

    const confirmLogout = () => {
        setShowLogoutDialog(false);
        logout();
    };

    const hideOnRoutes = ['/login', '/signup'];
    if (hideOnRoutes.includes(location.pathname)) {
        return null;
    }

    return (
        <>
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-8">
                            <Link to="/properties" className="text-xl font-bold text-purple-800">
                                PropertyHub
                            </Link>
                            <nav className="hidden md:flex items-center gap-4">
                                <Link
                                    to="/properties"
                                    className={`px-3 py-2 rounded-lg transition-colors ${location.pathname === '/properties'
                                        ? 'text-purple-800 bg-purple-50'
                                        : 'text-gray-600 hover:text-purple-800 hover:bg-purple-50'
                                        }`}
                                >
                                    Properties
                                </Link>
                                {isAuthenticated && (
                                    <>
                                        <Link
                                            to="/favorites"
                                            className={`px-3 py-2 rounded-lg transition-colors ${location.pathname === '/favorites'
                                                ? 'text-purple-800 bg-purple-50'
                                                : 'text-gray-600 hover:text-purple-800 hover:bg-purple-50'
                                                }`}
                                        >
                                            Favorites
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>

                        <div className="flex items-center gap-4">
                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to="/profile"
                                        className="text-gray-600 hover:text-purple-800 px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors"
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="text-gray-600 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-gray-600 hover:text-purple-800 px-4 py-2"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="bg-purple-800 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <Dialog
                isOpen={showLogoutDialog}
                onClose={() => setShowLogoutDialog(false)}
                onConfirm={confirmLogout}
                title="Confirm Logout"
                message="Are you sure you want to logout? You will need to login again to access your account."
                confirmText="Logout"
                cancelText="Cancel"
                confirmVariant="danger"
            />
        </>
    );
}
