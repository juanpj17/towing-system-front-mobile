import React, { createContext, useContext, useState } from 'react';

interface IUser {
    id: string;
    name: string;
    token: string;
    isActive: boolean;
}

interface AuthContextType {
    user: IUser | null; 
    login: (user: IUser) => void; 
    logout: () => void; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode })
{
    const [user, setUser] = useState<IUser | null>(null);
    const login = async(userData: IUser) => { 
        setUser(userData) 
    };

    const logout = async() => { 
        setUser(null); 
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}