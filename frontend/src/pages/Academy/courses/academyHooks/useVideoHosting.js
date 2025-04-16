import { useQuery } from '@tanstack/react-query';
import { fetchVideoUrl } from '../../academyApi/video';

export const useVideoUrl = (lessonId) => {
  return useQuery({
    queryKey: ['video', lessonId],
    queryFn: () => fetchVideoUrl(lessonId),
    staleTime: 60 * 60 * 1000, // Кешируем на 1 час
  });
};