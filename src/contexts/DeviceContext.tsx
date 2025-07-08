import { createContext, useEffect, useState, type ReactNode } from "react";
import type { IDevice } from "../utils/util";

export interface IDeviceContext {
  devices: IDevice[];
  loading: boolean;
}

export const defaultDeviceContext: IDeviceContext = {
  devices: [],
  loading: true,
};

export const DeviceContext =
  createContext<IDeviceContext>(defaultDeviceContext);

export const DeviceContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [devices, setDevices] = useState<IDevice[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadDevice() {
    setLoading(true);
    const response = await fetch("http://localhost:8000/api/devices");
    const data = await response.json();
    if (Array.isArray(data[0])) {
      setDevices(data[0]);
    } else {
      setDevices([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    setTimeout(() => loadDevice(), 1000);
  }, []);

  return (
    <DeviceContext.Provider value={{ devices, loading }}>
      {children}
    </DeviceContext.Provider>
  );
};
