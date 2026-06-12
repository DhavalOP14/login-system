import { useState } from "react";
import "../style.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isValid = username.trim() && password.trim() && email.trim();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, username, password };
    try {
      await axios.post("http://localhost:5000/api/auth/register", data);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "somthing went wrong...");
    }
  };
  return (
    <div>
      <form className="register" onSubmit={handleSubmit}>
        <h1>Register form</h1>
        <div className="email">
          <label>email:</label>
          <input
            type="email"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
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
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        {!isValid && (
          <p style={{ color: "red" }}> Plz Enter all credentials...</p>
        )}
        <div className="submit">
          <button
            className="btn"
            type="submit"
            disabled={!username || !password || !email}
          >
            Register
          </button>
          <div>
            <p>
              already Have account..?
              <Link to={"/login"}>login</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
