import { useNavigate } from "react-router-dom";
import "../style.css";
import axios from "axios";
const DashBoard = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const profile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/profile", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      alert(res.data.username);
    } catch (error) {
      alert(error.reponse?.data?.message || error.message);
    }
  };
  return (
    <div>
      <h1>DashBoard...!!!</h1>
      <button className="logout" onClick={logOut}>
        LogOUT
      </button>
      <p></p>
      <button className="profile" onClick={profile}>
        Profile
      </button>
    </div>
  );
};

export default DashBoard;
