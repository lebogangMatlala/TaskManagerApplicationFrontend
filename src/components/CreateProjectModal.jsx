import { useState } from "react";

const STATUSES = [
  "NotStarted",
  "Active",
  "InProgress",
  "Completed",
  "OnHold",
  "Cancelled",
];

export default function CreateProjectModal({ onClose, onCreate }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("NotStarted");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Project name is required");
    onCreate({ name, description, status });
    setName("");
    setDescription("");
    setStatus("NotStarted");
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>New Project</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <input
            type="text"
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          <textarea
            placeholder="Project Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ ...styles.input, height: "80px" }}
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={styles.input}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <button type="button" style={styles.cancel} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" style={styles.submit}>
              Create
            </button>
          </div>
        </form>
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
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modal: {
    background: "#fff",
    padding: "25px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "100%",
  },
  cancel: {
    padding: "10px 16px",
    borderRadius: "6px",
    border: "none",
    background: "#ccc",
    color: "#000",
    cursor: "pointer",
  },
  submit: {
    padding: "10px 16px",
    borderRadius: "6px",
    border: "none",
    background: "#764ba2",
    color: "#fff",
    cursor: "pointer",
  },
};