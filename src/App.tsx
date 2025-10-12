import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import { useState } from "react"

export type UserInfo = {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);

  return (
    <div>
      {!isLoggedIn && <Landing isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>}
      {isLoggedIn && <Dashboard user={user}/>}
    </div>
  )
}

export default App