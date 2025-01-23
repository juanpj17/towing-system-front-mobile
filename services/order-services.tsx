import { IOrder } from "../context/order-context"
import { ServiceError } from "./errors/service-errors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from '../configs';

const API_BASE_URL = Config.API_URI;

export const orderService = {

    async FindOrderById(orderId: string): Promise<IOrder> {
        try {
            const token = await AsyncStorage.getItem("user");           
            const url =  API_BASE_URL + '/api/order/find/' + orderId
            console.log(url)
            const headers = {
                Authorization: `Bearer ${token}`
            };

            const response = await fetch(url, {method: 'GET', headers});
            const data = await response.json();

            if (!response.ok) {
                throw new ServiceError(
                    response.status,
                    `Failed to fetch order: ${response.statusText}`
                );
            }

            const mappedOrder: IOrder = {
                Id: data.id,
                Status: data.status,
                IssueLocation: data.issueLocation,
                Destination: data.destination,
                Details: data.details,
                ClientName: data.name,
                PhoneNumber: data.phoneNumber,
            };

            return mappedOrder;
        } catch (error) {
            if (error instanceof ServiceError) {
                throw error;
            }
            throw new Error('Failed to fetch order: Network error');
        }
    },

    async updateOrder(orderId: string, status: string): Promise<IOrder> {
        try {
            const token = await AsyncStorage.getItem("user");  
            const url = `${API_BASE_URL}/api/order/update/status`
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }

            const response = await fetch(url, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({id: orderId, status: status}),
            });

            if (!response.ok) {
                throw new ServiceError(
                    response.status,
                    `Failed to update order: ${response.statusText}`
                );
            }

            return response.json();
        } catch (error) {
            if (error instanceof ServiceError) {
                throw error;
            }
            throw new Error('Failed to update order: Network error');
        }
    },
};