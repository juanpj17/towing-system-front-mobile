import React, { createContext, useContext, useState } from 'react';

export interface IDriver
{
    Id: string;
    Name: string;
    Email: string;
    IdentificationNumber: number;
    DrivingLicenseExpiranseDate: Date;
    MedicalCerificateExpiranseDate: Date;
    Location: string;
    Status: string;
}

interface DriverContextType {
    driver: IDriver | null; 
    setDriverData: (driver: IDriver) => void; 
    removeDriver: () => void; 
}

const DriverContext = createContext<DriverContextType | undefined>(undefined);

export function DriverProvider({ children }: { children: React.ReactNode })
{
    const [driver, setDriver] = useState<IDriver | null>(null);
    
    const setDriverData = async(driverData: IDriver) => { 
        setDriver(driverData) 
    };

    const removeDriver = async() => { 
        setDriver(null); 
    };

    return (
        <DriverContext.Provider value={{ driver, setDriverData, removeDriver }}>
        {children}
        </DriverContext.Provider>
    );
}

export function useDriver() {
    const context = useContext(DriverContext);
    if (context === undefined) {
        throw new Error('useDriver must be used within an DriverProvider');
    }
    return context;
}