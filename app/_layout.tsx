import { Slot } from 'expo-router';
import { AuthProvider } from '../context/auth-context';
import { OrderProvider} from '../context/order-context';
import { DriverProvider } from '../context/driver-context'
import NotificationInitializer from "./notifications"

const RootLayout = () => {
  return (
    <AuthProvider>
      <OrderProvider>
        <DriverProvider>
        <NotificationInitializer />
        <Slot />
        </DriverProvider>
      </OrderProvider>
    </AuthProvider>
  );
};


export default RootLayout;
