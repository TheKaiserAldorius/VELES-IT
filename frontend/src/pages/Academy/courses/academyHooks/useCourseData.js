import { useQuery } from '@tanstack/react-query';
import { fetchCourseDetails } from '../academyApi/courses';

export const useCourseData = (courseId) => {
  return useQuery({
    queryKey: ['course', courseId],
    queryFn: () => fetchCourseDetails(courseId),
  });
};