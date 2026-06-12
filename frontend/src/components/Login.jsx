import { useState } from "react";
import "../style.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isValid = username.trim() && password.trim();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { username, password };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        data,
      );

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Something happened");
    }
  };
  return (
    <div>
      <form className="login" onSubmit={handleSubmit}>
        <h1>login form</h1>
        <div className="username">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            placeholder="Enter UserName"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div className="password">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        {!isValid && <p style={{ color: "red" }}> Plz Enter Both...</p>}
        <div className="submit">
          <button className="btn" type="submit" disabled={!isValid}>
            Login
          </button>
        </div>
        <div>
          <p>
            Don't Have account..?
            <Link to={"/register"}>Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
