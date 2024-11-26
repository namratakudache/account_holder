import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sandbox-apiconnect.42cards.in/pismo-api/programs/v1/programs',
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.error('No authToken found');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const fetchPrograms = async () => {
  try {
    const response = await api.get('/programs');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch programs', error);
    throw new Error('Failed to fetch programs data');
  }
};
