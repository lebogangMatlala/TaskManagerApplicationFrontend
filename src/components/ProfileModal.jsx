import { useState, useEffect, useMemo } from "react";
import { updateProfile, deleteProfile, logoutUser } from "../api/api"; // adjust path as needed

export default function ProfileModal({ user, onClose }) {
  const safeUser = useMemo(() => user || { name: "", surname: "", email: "" }, [user]);

  const [name, setName] = useState(safeUser.name);
  const [surname, setSurname] = useState(safeUser.surname);
  const [email, setEmail] = useState(safeUser.email);
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState(""); // for success/error feedback
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(safeUser.name);
    setSurname(safeUser.surname);
    setEmail(safeUser.email);
  }, [safeUser]);

  const handleUpdate = async () => {
    setLoading(true);
    setMessage("");
    try {
      const payload = { name, surname, email };
      if (password) payload.password = password;

      await updateProfile(payload);

      // Update localStorage
      const updatedUser = { ...safeUser, ...payload };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setMessage("Profile updated successfully!");
      setPassword(""); // clear password field
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete your account?")) return;
    try {
      await deleteProfile();
      logoutUser();
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete account");
    }
  };

  const handleLogout = () => {
    logoutUser();
    window.location.href = "/login";
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>User Profile</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          type="password"
        />

        {message && <div style={styles.message}>{message}</div>}

        <div style={styles.buttonRow}>
          <button style={styles.primary} onClick={handleUpdate} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
          <button style={styles.danger} onClick={handleDelete}>Delete Account</button>
          <button style={styles.secondary} onClick={handleLogout}>Logout</button>
          <button style={styles.cancel} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  },
  modal: {
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    width: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "100%"
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "10px"
  },
  primary: {
    padding: "10px 16px",
    background: "#764ba2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  secondary: {
    padding: "10px 16px",
    background: "#0077cc",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  danger: {
    padding: "10px 16px",
    background: "#d9534f",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  cancel: {
    padding: "10px 16px",
    background: "#ccc",
    color: "#000",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  message: {
    color: "#28a745",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "5px"
  }
};