import { Route, Routes } from "react-router"
import Login from "./components/login"
import Signup from "./components/signup"
import Dashboard from "./components/dashboard"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("auth"))
    if(users){
      setUser(users)
    }
    console.log(users)
  }, [])

  const handleLogout = () => {
    setUser(null);
    navigate('/')
  };

  return (
    <div>
      <Routes>
        <Route 
          exact
          path="/"
          element={user ? <Dashboard handleLogout={handleLogout} /> : <Login />}
        />
        <Route 
          path="/signup"
          element={<Signup />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard handleLogout={handleLogout} /> : <Login />}
        />
      </Routes>
      
    </div>
  )
}

export default App
