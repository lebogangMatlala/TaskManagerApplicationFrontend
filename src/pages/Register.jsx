import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CenteredCard from "../components/CenteredCard";

const API = "https://taskmanagerapi-bsfahnbuc3dzbmd6.southafricanorth-01.azurewebsites.net/api";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

     // Password length check
  if (password.length < 6) {
    alert("Password must be at least 6 characters long!");
    return;
  }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.post(`${API}/Auth/register`, { email, password, name, surname });
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert("Error registering user: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <CenteredCard title="Register" subtitle="Create your account">
      <form onSubmit={handleRegister} style={styles.form}>
        <input
          placeholder="Name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Surname"
          type="text"
          value={surname}
          onChange={e => setSurname(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={styles.input}
        />

        <div style={styles.passwordWrapper}>
          <input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={styles.input}
          />
          <span
            style={styles.eye}
            onClick={() => setShowPassword(prev => !prev)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <div style={styles.passwordWrapper}>
          <input
            placeholder="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            style={styles.input}
          />
          <span
            style={styles.eye}
            onClick={() => setShowConfirmPassword(prev => !prev)}
          >
            {showConfirmPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button style={styles.btn}>Register</button>

         {/* Login link */}
    <div style={styles.loginLinkWrapper}>
      <span>Already have an account? </span>
      <span
        style={styles.loginLink}
        onClick={() => navigate("/login")}
      >
        Login
      </span>
    </div>
      </form>
    </CenteredCard>
  );
}

const styles = {
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { 
    padding: "12px", 
    paddingRight: "40px", // extra space for eye icon
    borderRadius: "6px", 
    border: "1px solid #ccc", 
    width: "100%", 
    boxSizing: "border-box"
  },
  btn: { 
    padding: "12px", 
    borderRadius: "6px", 
    border: "none", 
    background: "#764ba2", 
    color: "white", 
    cursor: "pointer" 
  },
  passwordWrapper: { 
    position: "relative", 
    display: "flex", 
    alignItems: "center" 
  },
  eye: { 
    position: "absolute", 
    right: "10px", 
    cursor: "pointer", 
    userSelect: "none" 
  },
  loginLinkWrapper: { textAlign: "center", marginTop: "10px", fontSize: "14px" },
loginLink: { color: "#764ba2", cursor: "pointer", fontWeight: "bold" },
};