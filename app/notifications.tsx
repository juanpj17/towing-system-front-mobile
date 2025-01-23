import React, { useEffect } from "react";
import { useOrder } from "../context/order-context";
import { handleNotificationActions } from "../services/notification-services";

const NotificationInitializer = () => {
  const { GetOrder } = useOrder();

  useEffect(() => {
    handleNotificationActions(GetOrder);
  }, [GetOrder]);

  return null;
};

export default NotificationInitializer;