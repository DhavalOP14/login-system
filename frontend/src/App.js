import "./App.css";
import "./style.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/register" element={<Register></Register>} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard></DashBoard>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
