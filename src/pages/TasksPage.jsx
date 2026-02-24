import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import CreateTaskModal from "../components/CreateTaskModal";
import EditTaskModal from "../components/EditTaskModal";
import { 
    getTasks, 
  createTask, 
  updateTask, 
  deleteTask 
} from "../api/api"; // your API functions

const STATUSES = ["Pending","Done","Open","InProgress"];
export default function TasksPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [editTaskData, setEditTaskData] = useState(null);

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await getTasks(projectId);
        setTasks(res.data.tasks || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [projectId]);

  // CRUD functions
  const handleCreateTask = async (taskData) => {
    try {
      const res = await createTask(projectId, taskData);
      setTasks(prev => [...prev, res.data]);
      setShowCreate(false);
    } catch (err) { 
      console.error(err);
      alert("Failed to create task"); 
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const res = await updateTask(projectId, taskData.id, taskData);
      setTasks(prev => prev.map(t => t.id === res.data.id ? res.data : t));
      setEditTaskData(null);
    } catch (err) { 
      console.error(err);
      alert("Failed to update task"); 
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await deleteTask(projectId, taskId);
      setTasks(prev => prev.filter(t => t.id !== taskId));
    } catch { alert("Failed to delete task"); }
  };

  // Group tasks by status
  const grouped = STATUSES.reduce((acc, status) => {
    acc[status] = tasks.filter(t => t.status === status);
    return acc;
  }, {});

  return (
    <DashboardCard title={`Project Tasks`} subtitle="" bgColor="white">
      <div style={styles.topBar}>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>← Back</button>
        <button style={styles.createBtn} onClick={() => setShowCreate(true)}>+ Add Task</button>
      </div>

      {loading ? <p style={{textAlign:"center"}}>Loading tasks...</p> :
        <div style={styles.board}>
          {STATUSES.map(status => (
            <div key={status} style={styles.column}>
              <h3 style={styles.columnTitle}>{status}</h3>
              {grouped[status].length ? grouped[status].map(task => (
                <div key={task.id} style={styles.taskCard}>
                  <strong>{task.title}</strong>
                  <p>{task.description}</p>
                  <p><em>Priority: {task.priority}</em></p>
                  <p><em>Due: {new Date(task.dueDate).toLocaleDateString()}</em></p>
                  <div style={styles.taskActions}>
                    <button style={styles.editBtn} onClick={() => setEditTaskData(task)}>Edit</button>
                    <button style={styles.deleteBtn} onClick={() => handleDeleteTask(task.id)}>Delete</button>
                  </div>
                </div>
              )) : <p style={{fontStyle:"italic"}}>No tasks</p>}
            </div>
          ))}
        </div>
      }

      {showCreate && <CreateTaskModal onClose={()=>setShowCreate(false)} onCreate={handleCreateTask} />}
      {editTaskData && <EditTaskModal task={editTaskData} onClose={()=>setEditTaskData(null)} onUpdate={handleUpdateTask} />}
    </DashboardCard>
  );
}

const styles = {
  topBar: { display:"flex", justifyContent:"space-between", marginBottom:"20px" },
  backBtn: { padding:"6px 12px", borderRadius:"6px", border:"none", background:"#764ba2", color:"#fff", cursor:"pointer" },
  createBtn: { padding:"6px 12px", borderRadius:"6px", border:"none", background:"#28a745", color:"#fff", cursor:"pointer" },
  board: { display:"flex", gap:"20px", overflowX:"auto" },
  column: { minWidth:"200px", background:"#f8f9fa", borderRadius:"8px", padding:"10px" },
  columnTitle: { textAlign:"center", marginBottom:"10px" },
  taskCard: { background:"#fff", padding:"10px", borderRadius:"6px", marginBottom:"10px", boxShadow:"0 2px 6px rgba(0,0,0,0.1)" },
  taskActions: { display:"flex", justifyContent:"space-between", marginTop:"5px" },
  editBtn: { padding:"4px 8px", borderRadius:"6px", border:"none", background:"#0077cc", color:"#fff", cursor:"pointer" },
  deleteBtn: { padding:"4px 8px", borderRadius:"6px", border:"none", background:"#dc3545", color:"#fff", cursor:"pointer" }
};