import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";
import CenteredCard from "../components/CenteredCard";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: res.data.id,
          name: res.data.name,
          surname: res.data.surname,
          email: res.data.email,
        })
      );
      navigate("/dashboard");
    } catch (err) {
      setError(
        "Invalid email or password " + (err.response?.data?.message || "")
      );
    }
  };

  return (
    <CenteredCard title="Login" subtitle="Enter your credentials">
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <div style={styles.passwordWrapper}>
          <input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.passwordInput}
          />
          <span
            style={styles.eye}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button style={styles.btn}>Login</button>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <p style={styles.signupText}>
          Don't have an account?{" "}
          <span style={styles.signupLink} onClick={() => navigate("/register")}>
            Sign Up
          </span>
        </p>
      </form>
    </CenteredCard>
  );
}

const styles = {
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { padding: "12px", borderRadius: "6px", border: "1px solid #ccc" },
  btn: {
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    background: "#667eea",
    color: "white",
    cursor: "pointer",
  },
  passwordWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  passwordInput: {
    padding: "12px",
    paddingRight: "40px", // leave space for the eye icon
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "100%",
  },
  eye: {
    position: "absolute",
    right: "10px",
    cursor: "pointer",
    userSelect: "none",
    fontSize: "18px",
  },
  signupText: { textAlign: "center", marginTop: "10px" },
  signupLink: { color: "#667eea", cursor: "pointer", fontWeight: "bold" },
};