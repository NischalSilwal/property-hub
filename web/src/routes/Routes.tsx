import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../store/AuthContext';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';
import { PropertyListings } from '../pages/PropertyListings';
import { Navbar } from '../components/Navbar';

function PublicRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/properties" replace />;
    }

    return <>{children}</>;
}

export function AppRoutes() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/properties" element={<PropertyListings />} />
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <PublicRoute>
                                <Signup />
                            </PublicRoute>
                        }
                    />
                    <Route path="/" element={<Navigate to="/properties" replace />} />
                    <Route path="*" element={<Navigate to="/properties" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
