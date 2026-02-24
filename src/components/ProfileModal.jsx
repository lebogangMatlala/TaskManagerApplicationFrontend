import { useState, useEffect, useMemo } from "react";

export default function ProfileModal({ user, onClose, onUpdate, onDelete, onContactAdmin }) {
  // Wrap safeUser in useMemo so it only recalculates if `user` changes
  const safeUser = useMemo(() => user || { name: "", email: "" }, [user]);

  const [name, setName] = useState(safeUser.name);
  const [email, setEmail] = useState(safeUser.email);

  // Keep state synced with safeUser
  useEffect(() => {
    setName(safeUser.name);
    setEmail(safeUser.email);
  }, [safeUser]);

  const handleUpdate = () => {
    onUpdate({ ...safeUser, name, email });
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>User Profile</h2>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <div style={styles.buttonRow}>
          <button style={styles.primary} onClick={handleUpdate}>Save</button>
          <button
            style={styles.danger}
            onClick={() => { if (window.confirm("Delete your account?")) onDelete(); }}
          >
            Delete Account
          </button>
          <button style={styles.secondary} onClick={onContactAdmin}>Contact Admin</button>
          <button style={styles.cancel} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: { position: "fixed", top:0,left:0,width:"100%",height:"100%", background:"rgba(0,0,0,0.5)", display:"flex", justifyContent:"center", alignItems:"center", zIndex:999 },
  modal: { background:"#fff", padding:"25px", borderRadius:"10px", width:"400px", display:"flex", flexDirection:"column", gap:"10px" },
  input: { padding:"10px", borderRadius:"6px", border:"1px solid #ccc", width:"100%" },
  buttonRow: { display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"10px", marginTop:"10px" },
  primary: { padding:"10px 16px", background:"#764ba2", color:"#fff", border:"none", borderRadius:"6px", cursor:"pointer" },
  secondary: { padding:"10px 16px", background:"#0077cc", color:"#fff", border:"none", borderRadius:"6px", cursor:"pointer" },
  danger: { padding:"10px 16px", background:"#d9534f", color:"#fff", border:"none", borderRadius:"6px", cursor:"pointer" },
  cancel: { padding:"10px 16px", background:"#ccc", color:"#000", border:"none", borderRadius:"6px", cursor:"pointer" },
};