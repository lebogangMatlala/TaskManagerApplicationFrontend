import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";
import CenteredCard from "../components/CenteredCard";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify({
        id: res.data.id,
        name: res.data.name,
        surname: res.data.surname,
        email: res.data.email
      }));
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password " + (err.response?.data?.message || ""));
    }
  };

  return (
    <CenteredCard title="Login" subtitle="Enter your credentials">
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={styles.input}
        />
        <button style={styles.btn}>Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </CenteredCard>
  );
}

const styles = {
  form: { display:"flex", flexDirection:"column", gap:"15px" },
  input: { padding:"12px", borderRadius:"6px", border:"1px solid #ccc" },
  btn: { padding:"12px", borderRadius:"6px", border:"none", background:"#667eea", color:"white", cursor:"pointer" },
};