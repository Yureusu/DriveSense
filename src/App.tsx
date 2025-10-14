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
  name: string | null;
  contact: string | null;
  license: string | null;
}

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState<UserInfo | null>(null);

  const [driverInfo, setDriverInfo] = useState<DriverInfo[]>([]);

  return (
    <div>
      {!isLoggedIn && <Landing isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>}
      {isLoggedIn && <Dashboard user={user}
        driverInfo={driverInfo} setDriverInfo={setDriverInfo}/>}
    </div>
  )
}

export default App