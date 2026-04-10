import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { AuthContextType, User } from '../interfaces/auth';
import { authService } from '../services/authService';
import { tokenService } from '../services/tokenService';


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export type { AuthContextType };

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = !!user;

    const fetchUser = async () => {
        try {
            if (authService.isAuthenticated() || tokenService.getRefreshToken()) {
                const userData = await authService.getMe();
                setUser(userData);
            }
        } catch {
            authService.logout();
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const login = async (email: string, password: string) => {
        const response = await authService.login({ email, password });
        setUser(response.user);
    };

    const register = async (name: string, email: string, password: string) => {
        await authService.register({ name, email, password });
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, register, logout, fetchUser }
        }>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
