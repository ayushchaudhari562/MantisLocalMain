import axios from 'axios';

// Connect the frontend to our local backend Express server
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example: Fetch all companies
export const getCompanies = async () => {
  const response = await api.get('/companies');
  return response.data;
};

// Example: Fetch all products for a specific company
export const getProducts = async (companyId?: string) => {
  const url = companyId ? `/products?companyId=${companyId}` : '/products';
  const response = await api.get(url);
  return response.data;
};

export default api;
