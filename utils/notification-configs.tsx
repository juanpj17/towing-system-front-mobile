import messaging from '@react-native-firebase/messaging';
import notifee, { EventType, AndroidImportance } from '@notifee/react-native';

let isChannelCreated = false;
let isHandlerConfigured = false;

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    await displayNotification(remoteMessage);
});

export const configureNotificationChannel = async () => {
    if (!isChannelCreated) {
        await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            importance: AndroidImportance.HIGH,
        });
        isChannelCreated = true;
    }
};

export const requestNotificationPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    return enabled;
};

export const configureForegroundNotificationHandler = async () => {
    if (!isHandlerConfigured) {
        messaging().onMessage(async (remoteMessage) => {
            if (remoteMessage) {
                await displayNotification(remoteMessage);
            }
        });
        isHandlerConfigured = true;
    }
};



export const displayNotification = async (remoteMessage) => {
    const { order_id, category } = remoteMessage.data;

    await configureNotificationChannel();

    const activeNotifications = await notifee.getDisplayedNotifications();
    const isDuplicate = activeNotifications.some(
        notification => notification.notification.data?.orderId === order_id
    );

    if (!isDuplicate) {
        await notifee.displayNotification({
            id: `order-${order_id}`, 
            title: remoteMessage.notification?.title || 'Nueva Orden',
            body: remoteMessage.notification?.body || '¿Deseas aceptar esta solicitud?',
            android: {
                channelId: 'default',
                actions: [
                    {
                        title: 'Aceptar',
                        pressAction: { id: 'Accepted' },
                    },
                    {
                        title: 'Rechazar',
                        pressAction: { id: 'Rejected' },
                    },
                ],
            },
            data: {
                orderId: order_id,
                category: category,
            },
        });
    }
};


