import {
  PostSimulatorThermometerIdStartRequest,
  simulatorThermometerAPI,
} from '@/services/api-client';
import { TUseMutationOptions } from '@/services/interface';
import { useMutation } from '@tanstack/react-query';

import { getAccessToken } from '..';

async function startThermometerRequest(
  request: PostSimulatorThermometerIdStartRequest
) {
  const jwt = getAccessToken();

  return simulatorThermometerAPI.postSimulatorThermometerIdStart(request, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
  });
}

export function useStartThermometerMutation(
  options?: TUseMutationOptions<typeof startThermometerRequest>
) {
  return useMutation({
    mutationKey: ['startThermometerRequest'],
    mutationFn: (args) => startThermometerRequest(...args),
    ...options,
  });
}
