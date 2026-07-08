import axios from "axios";

// Đảm bảo file .env của bạn có chứa: VITE_API_URL=https://[ID].mockapi.io/lab-fer
const baseUrl = import.meta.env.VITE_API_URL;
if (!baseUrl) {
  throw new Error('Missing VITE_API_URL. Create a .env file at the project root with VITE_API_URL=https://<your-id>.mockapi.io/lab-fer');
}

export const getAllOrchids = async () => {
    const response = await axios.get(baseUrl);
    const data = response.data;
    return Array.isArray(data) ? data : data?.data ?? [];
};

export const createOrchid = async (orchidData) => {
    const response = await axios.post(baseUrl, orchidData);
    return response.data;
};

export const updateOrchid = async (id, orchidData) => {
    const response = await axios.put(`${baseUrl}/${id}`, orchidData);
    return response.data;
};

export const deleteOrchid = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
};