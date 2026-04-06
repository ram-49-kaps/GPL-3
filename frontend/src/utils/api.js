import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
});

export const submitRegistration = async (formData) => {
  const data = new FormData();
  data.append('name', formData.name);
  data.append('email', formData.email);
  data.append('phone', formData.phone);
  data.append('playing_2025', formData.playing_2025);
  data.append('player_type', formData.player_type);
  data.append('payment_method', formData.payment_method);
  
  if (formData.photo) {
    data.append('photo', formData.photo);
  }

  const response = await api.post('/api/register', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export default api;
