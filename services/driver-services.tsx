import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDriver as DriverContext, IDriver} from '../context/driver-context';
import { getDriverId } from '../utils/jwt-configs'
import configs from "../configs";


export function driverServices()
{
    const driver = DriverContext()

    const FindDriverById = async (setDriverData: (driver: IDriver) => void): Promise<IDriver> => {
        const driverId = await getDriverId();
        const token = await AsyncStorage.getItem("user");
        const url = configs.API_URI + '/api/towdriver/find/id/' + driverId;
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const response = await fetch(url, { method: "GET", headers });
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }   
        const data = await response.json();

        const driverdata: IDriver = {
            Id: data.towDriverId,
            Name: data.towDriverName,
            Email: data.towDriverEmail,
            IdentificationNumber: data.towDriverIdentificationNumber,
            DrivingLicenseExpiranseDate: data.licenseExpirationDate,
            MedicalCerificateExpiranseDate: data.medicalCertificateExpirationDate,
            Location: data.location,
            Status: data.status,
        };
        setDriverData(driverdata);
        return driverdata;
        
    };
    
    const UpdateDriverStatus = async (
        status: string,
        setDriverData: (driver: IDriver) => void
    ): Promise<string> => {
        try {
            const driverId = await getDriverId();
            const token = await AsyncStorage.getItem("user");
            const url = configs.API_URI + '/api/towdriver/update/status';
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };
    
            const response = await fetch(url, {
                method: "PATCH",
                headers,
                body: JSON.stringify({ id: driverId, status }),
            });
            const data = await response.json();
            await FindDriverById(setDriverData);
    
            return data;
        } catch (error) {
            console.error("Error intentando actualizar estado: ", error);
            throw new Error("Error intentando actualizar estado");
        }
    };
    

    const UpdateDriverLocation = async (
        location: string,
        setDriverData: (driver: IDriver) => void
    ): Promise<string> => {
        try {
            const driverId = await getDriverId();
            const token = await AsyncStorage.getItem("user");
            const url = configs.API_URI + '/api/towdriver/update/location';
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };
    
            const response = await fetch(url, {
                method: "PATCH",
                headers,
                body: JSON.stringify({ id: driverId, location }),
            });
            const data = await response.json();
    
            await FindDriverById(setDriverData);
    
            return data;
        } catch (error) {
            console.error("Error intentando actualizar estado: ", error);
            throw new Error("Error intentando actualizar estado");
        }
    };

    return {
        ...driver,
        FindDriverById,
        UpdateDriverStatus,
        UpdateDriverLocation
    };
}