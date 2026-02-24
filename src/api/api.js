import axios from "axios";

const API = "https://taskmanagerapi-bsfahnbuc3dzbmd6.southafricanorth-01.azurewebsites.net/api";

const axiosInstance = axios.create({ baseURL: API });

// Attach token dynamically
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const loginUser = (data) => axiosInstance.post("/Auth/login", data);
export const registerUser = (data) => axiosInstance.post("/Auth/register", data);

// Projects
export const getProjects = () => axiosInstance.get("/Project/GetAllProjects");
export const createProject = (data) => axiosInstance.post("/Project/CreateProject", data);
export const updateProject = (id, data) => axiosInstance.put(`/Project/UpdateProject/${id}`, data);
export const deleteProject = (id) => axiosInstance.delete(`/Project/DeleteProject/${id}`);

export const getTasks = (projectId) =>
    axiosInstance.get(`/projects/${projectId}/tasks`);
  
  export const createTask = (projectId, data) =>
    axiosInstance.post(`/projects/${projectId}/tasks`, data);
  
  export const updateTask = (projectId, taskId, data) =>
    axiosInstance.put(`/projects/${projectId}/tasks/${taskId}`, data);
  
  export const deleteTask = (projectId, taskId) =>
    axiosInstance.delete(`/projects/${projectId}/tasks/${taskId}`);

// Users (added)
export const updateUser = (user) => axiosInstance.put(`/User/UpdateUser/${user.id}`, user);
export const deleteUser = (userId) => axiosInstance.delete(`/User/DeleteUser/${userId}`);