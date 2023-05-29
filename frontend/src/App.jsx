import { Route, Routes } from "react-router"
import Login from "./components/login"
import Signup from "./components/signup"
import Dashboard from "./components/dashboard"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function App() {

  return (
    <div>
      <Routes>
        <Route 
          exact
          path="/"
          element={<Login />}
        />
        <Route 
          path="/signup"
          element={<Signup />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
      </Routes>
      
    </div>
  )
}

export default App
