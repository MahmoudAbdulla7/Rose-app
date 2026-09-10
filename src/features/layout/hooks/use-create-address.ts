import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createAddressAction } from '../lib/actions/addresses.action';

export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['create-address'],

    mutationFn: createAddressAction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['addresses'],
      });
    },

    onError: (error) => toast.error(error.message),
  });
}
