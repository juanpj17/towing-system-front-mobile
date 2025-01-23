import notifee, { EventType } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../configs';

const API_BASE_URL = Config.API_URI;

export const handleNotificationActions = (GetOrder) => {
    notifee.onForegroundEvent(async ({ type, detail }) => {
        if (type === EventType.ACTION_PRESS) {
            const { pressAction } = detail;

            if (pressAction.id === 'Accepted') {
                try {
                    const token = await AsyncStorage.getItem("user");
                    const orderId = detail.notification?.data?.orderId; 
                    const url = API_BASE_URL + '/api/order/driver/response'; 
            
                    const headers = {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    };
            
                    const response = await fetch(url, {
                        method: 'PATCH',
                        headers,
                        body: JSON.stringify({
                            orderId: orderId,
                            status: "Accepted", 
                            response: "Accepted",
                        }),
                    });
        
                    if (!response.ok) {
                        const errorText = await response.text(); 
                        throw new Error(`Error en la respuesta del servidor: ${response.status} - ${errorText}`);
                    }
                    
                    const data = await response.json();
                    await GetOrder(orderId.toString()); 
                } catch (error) {
                    console.error('Error al enviar la aceptación al backend:', error);
                }
            }

            if (pressAction.id === 'Rejected') {
                
                try {
                    const token = await AsyncStorage.getItem("user");
                    const orderId = detail.notification?.data?.orderId; 
                    const url =  API_BASE_URL + '/api/order/driver/response'; 
            
                    const headers = {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    };
            
                    const response = await fetch(url, {
                        method: 'PATCH',
                        headers,
                        body: JSON.stringify({
                            orderId: orderId,
                            status: "ToAssign", 
                            response: 'Rejected',
                        }),
                    });
        
                    if (!response.ok) {
                        const errorText = await response.text(); 
                        throw new Error(`Error en la respuesta del servidor: ${response.status} - ${errorText}`);
                    }       
                    const data = await response.json(); 
                    return data
                } catch (error) {
                    console.error('Error al enviar la aceptación al backend:', error);
                }
            }
        }
    });
};