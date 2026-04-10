import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';

export function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const location = useLocation();

    const hideOnRoutes = ['/login', '/signup'];
    if (hideOnRoutes.includes(location.pathname)) {
        return null;
    }

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-8">
                        <Link to="/properties" className="text-xl font-bold text-purple-600">
                            PropertyHub
                        </Link>
                        <nav className="hidden md:flex items-center gap-4">
                            <Link
                                to="/properties"
                                className={`px-3 py-2 rounded-lg transition-colors ${location.pathname === '/properties'
                                        ? 'text-purple-600 bg-purple-50'
                                        : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                                    }`}
                            >
                                Properties
                            </Link>
                            {isAuthenticated && (
                                <Link
                                    to="/favorites"
                                    className={`px-3 py-2 rounded-lg transition-colors ${location.pathname === '/favorites'
                                            ? 'text-purple-600 bg-purple-50'
                                            : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                                        }`}
                                >
                                    Favorites
                                </Link>
                            )}
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            <button
                                onClick={logout}
                                className="text-gray-600 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-600 hover:text-purple-600 px-4 py-2"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
