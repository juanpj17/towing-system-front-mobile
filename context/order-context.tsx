import React, { createContext, useContext, useState } from 'react';
import { orderService } from "../services/order-services"


export interface IOrder {
    Id: string;
    Status: string;
    IssueLocation: string;
    Destination: string;
    Details: string;
    ClientName: string;
    PhoneNumber: string;
}

const OrderContext = createContext<{
    orderData: IOrder | null;
    setOrderData: React.Dispatch<React.SetStateAction<IOrder | null>>;
    GetOrder: (orderId: string) => Promise<void>;
    OrderCompleted: () => void;
}>({
    orderData: null,
    setOrderData: () => {},
    GetOrder: async () => {},
    OrderCompleted: () => {}
});

export const OrderProvider = ({ children }) => {
    const [orderData, setOrderData] = useState(null);

    const GetOrder = async (orderId) => {
        try {
            const order = await orderService.FindOrderById(orderId);
            setOrderData(order);
        } catch (error) {
            console.error("Error al obtener la orden:", error);
        }
    };

    const OrderCompleted = () => 
    {
        setOrderData(null)
    }

    return (
        <OrderContext.Provider value={{ orderData, setOrderData, GetOrder, OrderCompleted }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => useContext(OrderContext);