import {
  PostSimulatorThermometerRequest,
  simulatorThermometerAPI,
} from '@/services/api-client';
import { TUseMutationOptions } from '@/services/interface';
import { useMutation } from '@tanstack/react-query';

import { getAccessToken } from '..';

async function createThermometerRequest(
  request: PostSimulatorThermometerRequest
) {
  const jwt = getAccessToken();

  return simulatorThermometerAPI.postSimulatorThermometer(request, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
  });
}

export function useCreateThermometerMutation(
  options?: TUseMutationOptions<typeof createThermometerRequest>
) {
  return useMutation({
    mutationKey: ['createThermometerRequest'],
    mutationFn: (args) => createThermometerRequest(...args),
    ...options,
  });
}
