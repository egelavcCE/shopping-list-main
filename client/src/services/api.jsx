import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Kullanıcı kaydetme
export const registerUser = async (name, surname, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { name, surname, email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Kayıt sırasında hata oluştu');
  }
};

// Kullanıcı girişi
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.userId) {
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('userName', response.data.name);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Giriş sırasında hata oluştu');
  }
};
