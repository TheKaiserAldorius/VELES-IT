import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useAllCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const response = await axios.get('/api/academy/courses/');
      return response.data;
    }
  });
};

export const useSingleCourse = (courseId) => {
  return useQuery({
    queryKey: ['course', courseId],
    queryFn: async () => {
      const response = await axios.get(`/api/academy/courses/${courseId}/`);
      return response.data;
    },
    enabled: !!courseId
  });
};