import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

export type UserInfo = {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string | null;
};

export type DriverInfo = {
  id: string | null;
  name: string | null;
  contact: string | null;
  license: string | null;
};

export type VehicleInfo = {
  id: string | null;
  plateNumber: string | null;
  model: string | null;
  driver: string | null;
  createdAt: string | null;
};

export type FuelInfo = {
  id: string | null;
  vehicle: string | null;
  volume: number | null;
  cost: number | null;
  addedBy: string | null;
  logDate: string | null;
};

export type MaintenanceInfo = {
  id: string | null;
  vehicle: string | null;
  desrcription: string | null;
  cost: number | null;
  createdAt: string | null;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);

  const [driverInfo, setDriverInfo] = useState<DriverInfo[]>([]);
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo[]>([]);
  const [fuelInfo, setFuelInfo] = useState<FuelInfo[]>([]);
  const [maintenanceInfo, setMaintenanceInfo] = useState<MaintenanceInfo[]>([]);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const mappedUser: UserInfo = {
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          uid: firebaseUser.uid,
        };

        console.log("Logged in user:", mappedUser);
        setUser(mappedUser);
        setIsLoggedIn(true);
      } else {
        console.log("No user signed in bruh");
        setUser(null);
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!isLoggedIn) {
    return (
      <Landing
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
      />
    );
  }

  if (isLoggedIn && !user?.uid) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        Fetching user...
      </div>
    );
  }

  return (
    <Dashboard
      user={user}
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
      driverInfo={driverInfo}
      setDriverInfo={setDriverInfo}
      vehicleInfo={vehicleInfo}
      setVehicleInfo={setVehicleInfo}
      fuelInfo={fuelInfo}
      setFuelInfo={setFuelInfo}
      maintenanceInfo={maintenanceInfo}
      setMaintenanceInfo={setMaintenanceInfo}
    />
  );
}

export default App;
