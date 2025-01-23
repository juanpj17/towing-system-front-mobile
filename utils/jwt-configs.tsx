import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

export async function getDriverId(): Promise<string> {
    try {
        const token = await AsyncStorage.getItem("user");

        if (!token) {
            throw new Error("El token no está disponible en AsyncStorage");
        }

        const payload = token.split('.')[1]; 
        const decodedPayload = JSON.parse(atob(payload));
        return decodedPayload.sub; 

    } catch (error) {
        console.error("Error al obtener el driverId:", error.message);
        throw new Error("No se pudo resolver el JWT");
    }
}
