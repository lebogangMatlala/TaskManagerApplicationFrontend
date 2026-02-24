import { Link } from "react-router-dom";
import CenteredCard from "../components/CenteredCard";

export default function Landing() {
  return (
    <CenteredCard title="Task Manager" subtitle="Manage your projects & tasks easily" bgColor="white">
      <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
        <Link to="/login">
          <button style={styles.btnPrimary}>Login</button>
        </Link>
        <Link to="/register">
          <button style={styles.btnSecondary}>Register</button>
        </Link>
      </div>
    </CenteredCard>
  );
}

const styles = {
  btnPrimary: {
    padding: "12px 20px",
    border: "none",
    background: "#667eea",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
    flex: 1,
  },
  btnSecondary: {
    padding: "12px 20px",
    border: "none",
    background: "#764ba2",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
    flex: 1,
  },
};