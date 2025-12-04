
import axios from "axios";
const API = "http://localhost:5000/api/pastes";
const getToken = () => localStorage.getItem("token");

export function fetchPastes() {
  return axios.get(API, { headers: { Authorization: `Bearer ${getToken()}` } });
}
export function createPasteAPI(data) {
  return axios.post(API, data, { headers: { Authorization: `Bearer ${getToken()}` } });
}
export function updatePasteAPI(id, data) {
  return axios.put(`${API}/${id}`, data, { headers: { Authorization: `Bearer ${getToken()}` } });
}
export function deletePasteAPI(id) {
  return axios.delete(`${API}/${id}`, { headers: { Authorization: `Bearer ${getToken()}` } });
}
