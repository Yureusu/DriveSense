import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import { useState } from "react"

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {!isLoggedIn && <Landing isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}
      {isLoggedIn && <Dashboard />}
    </div>
  )
}

export default App