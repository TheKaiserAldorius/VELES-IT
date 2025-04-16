import { useQuery } from '@tanstack/react-query';
import { fetchUserProgress } from '../academyApi/userProgress';

export const useUserProgress = (userId) => {
  return useQuery({
    queryKey: ['userProgress', userId],
    queryFn: () => fetchUserProgress(userId),
    enabled: !!userId, // Запускает запрос только при наличии userId
  });
};