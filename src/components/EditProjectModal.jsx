import { useState, useEffect } from "react";

const STATUSES = ["NotStarted","Active","InProgress","Completed","OnHold","Cancelled"];

export default function EditProjectModal({ project, onClose, onUpdate }) {
  const [name, setName] = useState(project?.name || "");
  const [description, setDescription] = useState(project?.description || "");
  const [status, setStatus] = useState(project?.status || "NotStarted");

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
      setStatus(project.status);
    }
  }, [project]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Project name is required");
    onUpdate({ id: project.id, name, description, status });
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Edit Project</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
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
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <div style={styles.buttons}>
            <button type="button" style={styles.cancel} onClick={onClose}>Cancel</button>
            <button type="submit" style={styles.submit}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position:"fixed", top:0, left:0, width:"100%", height:"100%",
    backgroundColor:"rgba(0,0,0,0.5)", display:"flex", justifyContent:"center", alignItems:"center", zIndex:999
  },
  modal: {
    background:"#fff", padding:"25px", borderRadius:"8px", width:"400px", boxShadow:"0 4px 15px rgba(0,0,0,0.2)"
  },
  form: { display:"flex", flexDirection:"column", gap:"12px" },
  input: { padding:"10px", borderRadius:"6px", border:"1px solid #ccc", width:"100%" },
  buttons: { display:"flex", justifyContent:"flex-end", gap:"10px" },
  cancel: { padding:"10px 16px", borderRadius:"6px", border:"none", background:"#ccc", color:"#000", cursor:"pointer" },
  submit: { padding:"10px 16px", borderRadius:"6px", border:"none", background:"#28a745", color:"#fff", cursor:"pointer" }
};