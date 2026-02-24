// src/components/CreateTaskModal.jsx
import { useState } from "react";

const STATUSES = ["Pending","Done","Open","InProgress"];
const PRIORITIES = ["Low","Medium","High"];

export default function CreateTaskModal({ onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("NotStarted");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Task title is required");
    onCreate({ title, description, status, priority, dueDate });
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Create Task</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} style={styles.input} />
          <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} style={{...styles.input, height:"80px"}} />
          <select value={status} onChange={e=>setStatus(e.target.value)} style={styles.input}>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={priority} onChange={e=>setPriority(e.target.value)} style={styles.input}>
            {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} style={styles.input} />
          <div style={styles.actions}>
            <button type="button" style={styles.cancel} onClick={onClose}>Cancel</button>
            <button type="submit" style={styles.submit}>Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: { position:"fixed", top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.5)",display:"flex",justifyContent:"center",alignItems:"center",zIndex:999 },
  modal: { background:"#fff", padding:"25px", borderRadius:"8px", width:"400px", boxShadow:"0 4px 15px rgba(0,0,0,0.2)" },
  form: { display:"flex", flexDirection:"column", gap:"10px" },
  input: { padding:"10px", borderRadius:"6px", border:"1px solid #ccc", width:"100%" },
  actions: { display:"flex", justifyContent:"flex-end", gap:"10px" },
  cancel: { padding:"8px 14px", borderRadius:"6px", border:"none", background:"#ccc", cursor:"pointer" },
  submit: { padding:"8px 14px", borderRadius:"6px", border:"none", background:"#28a745", color:"#fff", cursor:"pointer" }
};