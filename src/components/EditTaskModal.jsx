// src/components/EditTaskModal.jsx
import { useState } from "react";

const STATUSES = ["Pending","Done","Open","InProgress"];
const PRIORITIES = ["Low","Medium","High"];

export default function EditTaskModal({ task, onClose, onUpdate }) {
    const [title, setTitle] = useState(task.title || "");
    const [description, setDescription] = useState(task.description || "");
    const [status, setStatus] = useState(task.status || "Pending");
    const [priority, setPriority] = useState(task.priority || "Low");
    const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate.split("T")[0] : "");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!title.trim()) return alert("Task title is required");
      onUpdate({ ...task, title, description, status, priority, dueDate });
    };
  
    return (
      <div style={styles.overlay}>
        <div style={styles.modal}>
          <h2>Edit Task</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} style={styles.input} />
            <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} style={{...styles.input,height:"80px"}} />
            <select value={status} onChange={e=>setStatus(e.target.value)} style={styles.input}>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={priority} onChange={e=>setPriority(e.target.value)} style={styles.input}>
              {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} style={styles.input} />
            <div style={styles.actions}>
              <button type="button" style={styles.cancel} onClick={onClose}>Cancel</button>
              <button type="submit" style={styles.submit}>Update</button>
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
  submit: { padding:"8px 14px", borderRadius:"6px", border:"none", background:"#0077cc", color:"#fff", cursor:"pointer" }
};