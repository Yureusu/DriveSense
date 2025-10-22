import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import { useState } from "react"

export type UserInfo = {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string | null;
}

export type DriverInfo = {
  id: string | null,
  name: string | null;
  contact: string | null;
  license: string | null;
}

export type VehicleInfo = {
  id: string | null;
  plateNumber: string | null;
  model: string | null;
  driver: string | null;
  createdAt: string | null;
}

export type FuelInfo = {
  id: string | null;
  vehicle: string | null;
  volume: number | null;
  cost: number | null;
  addedBy: string | null;
  logDate: string | null;
}

export type MaintenanceInfo = {
  id: string | null;
  vehicle: string | null;
  desrcription: string | null;
  cost: number | null;
  createdAt: string | null;
}

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState<UserInfo | null>(null);

  const [driverInfo, setDriverInfo] = useState<DriverInfo[]>([]);
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo[]>([]);
  const [fuelInfo, setFuelInfo] = useState<FuelInfo[]>([]);

  return (
    <div>
      {!isLoggedIn && <Landing isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>}
      {isLoggedIn && <Dashboard user={user} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
        driverInfo={driverInfo} setDriverInfo={setDriverInfo} 
        vehicleInfo={vehicleInfo} setVehicleInfo={setVehicleInfo}
        fuelInfo={fuelInfo} setFuelInfo={setFuelInfo}
        />}
    </div>

  )
}

export default App