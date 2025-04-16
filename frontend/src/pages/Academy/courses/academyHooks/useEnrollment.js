import { useMutation } from '@tanstack/react-query';
import { enrollToCourse } from '../../academyApi/courses';

export const useEnrollMutation = (courseId) => {
  return useMutation({
    mutationFn: (email) => enrollToCourse(courseId, email),
  });
};