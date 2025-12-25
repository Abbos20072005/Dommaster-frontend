import { useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { getMe } from '@/utils/api/requests';
import { COOKIES } from '@/utils/constants';

export const useAuth = () => {
  const getUsersMeQuery = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => getMe()
  });

  const user = getUsersMeQuery.data?.data;

  const queryClient = useQueryClient();

  const reset = () => {
    Cookies.remove(COOKIES.ACCESS_TOKEN);
    Cookies.remove(COOKIES.REFRESH_TOKEN);
    queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
  };

  return {
    user,
    reset,
    ...getUsersMeQuery
  };
};
