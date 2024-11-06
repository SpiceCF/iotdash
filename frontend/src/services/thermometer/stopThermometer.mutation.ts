import {
  PostSimulatorThermometerIdStopRequest,
  simulatorThermometerAPI,
} from '@/services/api-client';
import { TUseMutationOptions } from '@/services/interface';
import { useMutation } from '@tanstack/react-query';

import { getAccessToken } from '..';

async function stopThermometerRequest(
  request: PostSimulatorThermometerIdStopRequest
) {
  const jwt = getAccessToken();

  return simulatorThermometerAPI.postSimulatorThermometerIdStop(request, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
  });
}

export function useStopThermometerMutation(
  options?: TUseMutationOptions<typeof stopThermometerRequest>
) {
  return useMutation({
    mutationKey: ['stopThermometerRequest'],
    mutationFn: (args) => stopThermometerRequest(...args),
    ...options,
  });
}
