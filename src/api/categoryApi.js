import axios from "axios";

// Đảm bảo file .env của bạn có chứa: VITE_API_URL=https://[ID].mockapi.io/lab-fer
const baseUrl = import.meta.env.VITE_API_URL;
if (!baseUrl) {
  throw new Error('Missing VITE_API_URL. Create a .env file at the project root with VITE_API_URL=https://<your-id>.mockapi.io/lab-fer');
}

// Thay thế endpoint lab-fer bằng categories
const categoryUrl = baseUrl.replace('/lab-fer', '/categories');

export const getAllCategories = async () => {
    const response = await axios.get(categoryUrl);
    const data = response.data;
    return Array.isArray(data) ? data : data?.data ?? [];
};

export const createCategory = async (categoryData) => {
    const response = await axios.post(categoryUrl, categoryData);
    return response.data;
};

export const updateCategory = async (id, categoryData) => {
    const response = await axios.put(`${categoryUrl}/${id}`, categoryData);
    return response.data;
};

export const deleteCategory = async (id) => {
    const response = await axios.delete(`${categoryUrl}/${id}`);
    return response.data;
};
