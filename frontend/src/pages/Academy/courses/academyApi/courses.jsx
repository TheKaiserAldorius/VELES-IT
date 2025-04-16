import axios from 'axios';

const API_BASE = '/api/academy/';

export const fetchCourses = async () => {
  const response = await axios.get(`${API_BASE}courses/`);
  return response.data;
};

export const enrollToCourse = async (courseId, email) => {
  const response = await axios.post(`${API_BASE}courses/${courseId}/enroll/`, { email });
  return response.data;
};