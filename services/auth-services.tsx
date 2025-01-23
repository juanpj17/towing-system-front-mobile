import { useAuth as useAuthContext } from '../context/auth-context';
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../configs';

interface LoginResponse {
    success: boolean;
    error?: string;
}

const API_BASE_URL = Config.API_URI;

export function useAuth() {
    const auth = useAuthContext();
    const login = async (email: string, password: string): Promise<LoginResponse> => 
    {
        try {
            const deviceId = await messaging().getToken();
            const response = await fetch(API_BASE_URL + '/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, deviceId }),
            });

            const data = await response.json();
            if (data.token) {
                auth.login({
                    id: data.id,
                    name: data.name,
                    token: data.token,
                    isActive: true,
                });
            await AsyncStorage.setItem("user", data.token);

            return { success: true };
            } 
            
            return { 
            success: false, 
            error: data.message || 'Credenciales inválidas' 
            };
        
        }catch (error) {
            return { 
                success: false, 
                error: 'Error de conexión' 
            };
        }
    };

    const logout = async() => 
    {
        try
        {
            await AsyncStorage.removeItem("user");
            auth.logout();
        }
        catch(error)
        {
            throw new Error("Error intento cerrar sesion");
        }
    }
    
    return {
        ...auth,
        login,
        logout
    };
}