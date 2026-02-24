import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateProjectModal from "../components/CreateProjectModal";
import EditProjectModal from "../components/EditProjectModal"; // new modal for editing
import ProfileModal from "../components/ProfileModal";
import DashboardCard from "../components/DashboardCard";
import { getProjects, deleteProject, createProject, updateProject } from "../api/api";

const STATUSES = ["NotStarted","Active","InProgress","Completed","OnHold","Cancelled"];

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProjectData, setEditProjectData] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const navigate = useNavigate(); 
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await getProjects();
      setProjects(Array.isArray(res.data.projects) ? res.data.projects : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try { await deleteProject(id); setProjects(p => p.filter(pr => pr.id !== id)); }
    catch { alert("Failed to delete"); }
  };

  const handleCreateProject = async (projectData) => {
    try { const res = await createProject(projectData); setProjects(prev => [...prev, res.data]); setShowCreateModal(false); }
    catch { alert("Failed to create project"); }
  };

  const handleEditProject = async (projectData) => {
    try {
      const res = await updateProject(projectData.id, projectData);
      setProjects(prev => prev.map(p => p.id === res.data.id ? res.data : p));
      setShowEditModal(false);
    } catch { alert("Failed to update project"); }
  };

  const getStatusColor = (status) => ({
    NotStarted:"#6c757d", Active:"#28a745", InProgress:"#007bff",
    Completed:"#6f42c1", OnHold:"#fd7e14", Cancelled:"#dc3545"
  }[status] || "#6c757d");

  const displayedProjects = projects.filter(p =>
    (p.name.toLowerCase().includes(search.toLowerCase()) ||
     p.description.toLowerCase().includes(search.toLowerCase())) &&
    (filterStatus ? p.status === filterStatus : true)
  );

  return (
    <DashboardCard title={`Welcome, ${user?.name || "User"}!`} subtitle="" bgColor="white">

      {/* Top Bar: Logo + User/Profile */}
      <div style={styles.topBar}>
        <button style={styles.logoBtn}>🚀 Task Management</button>
        <div style={styles.userSection}>
          <button style={styles.profileBtn} onClick={()=>setShowProfileModal(true)}>Profile</button>
          <button style={styles.profileBtn} onClick={()=>setShowProfileModal(true)}>Logout</button>
        </div>
      </div>

      {/* Filters */}
      <div style={styles.controls}>
        <input type="text" placeholder="Search projects..." value={search} onChange={e=>setSearch(e.target.value)} style={styles.input} />
        <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} style={styles.input}>
          <option value="">All Statuses</option>
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button style={styles.createBtn} onClick={()=>setShowCreateModal(true)}>+ Create Project</button>
      </div>

      {/* Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedProjects.length ? displayedProjects.map(p => (
              <tr key={p.id}>
                <td style={styles.td}>{p.name}</td>
                <td style={styles.td}>{p.description}</td>
                <td style={{...styles.td, textAlign:"center"}}>
                  <span style={{...styles.statusBadge, backgroundColor:getStatusColor(p.status)}}>{p.status}</span>
                </td>
                <td style={{...styles.td, textAlign:"center"}}>
                <button
  style={styles.viewBtn}
  onClick={() => navigate(`/projects/${p.id}/tasks`)}
>
  View Tasks
</button>
                  <button style={styles.editBtn} onClick={()=>{ setEditProjectData(p); setShowEditModal(true); }}>Edit</button>
                  <button style={styles.deleteBtn} onClick={()=>handleDeleteProject(p.id)}>Delete</button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="4" style={{ textAlign:"center", padding:"15px" }}>No projects found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {showCreateModal && <CreateProjectModal onClose={()=>setShowCreateModal(false)} onCreate={handleCreateProject} />}
      {showEditModal && <EditProjectModal project={editProjectData} onClose={()=>setShowEditModal(false)} onUpdate={handleEditProject} />}
      {showProfileModal && <ProfileModal user={user} onClose={()=>setShowProfileModal(false)} onUpdate={()=>{}} onDelete={()=>{}} onContactAdmin={()=>{}} />}
    </DashboardCard>
  );
}

const styles = {
  topBar: { display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px" },
  logoBtn: { padding:"6px 12px", borderRadius:"6px", border:"none", background:"#764ba2", color:"#fff", fontWeight:"bold", cursor:"pointer" },
  userSection: { display:"flex", alignItems:"center", gap:"10px" },
  profileBtn: { padding:"6px 12px", borderRadius:"6px", border:"none", background:"#0077cc", color:"#fff", cursor:"pointer" },
  controls: { display:"flex", gap:"10px", flexWrap:"wrap", justifyContent:"center", marginBottom:"30px" },
  input: { padding:"10px", borderRadius:"6px", border:"1px solid #ccc", flex:1, minWidth:"120px" },
  createBtn: { padding:"10px 16px", borderRadius:"6px", border:"none", background:"#764ba2", color:"#fff", cursor:"pointer" },
  tableWrapper: { overflowX:"auto" },
  table: { width:"100%", borderCollapse:"collapse", fontSize:"14px", border:"1px solid #ccc" },
  th: { border:"1px solid #ccc", padding:"10px", background:"#f0f0f0", textAlign:"left" },
  td: { border:"1px solid #ccc", padding:"10px", textAlign:"left" },
  statusBadge: { padding:"5px 10px", borderRadius:"6px", color:"#fff", fontWeight:"bold", fontSize:"12px" },
  viewBtn: { padding:"5px 10px", borderRadius:"6px", border:"none", background:"#0077cc", color:"#fff", cursor:"pointer", marginRight:"5px" },
  editBtn: { padding:"5px 10px", borderRadius:"6px", border:"none", background:"#28a745", color:"#fff", cursor:"pointer", marginRight:"5px" },
  deleteBtn: { padding:"5px 10px", borderRadius:"6px", border:"none", background:"#dc3545", color:"#fff", cursor:"pointer" }
};