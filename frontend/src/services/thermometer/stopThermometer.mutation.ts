import {
  PostSimulatorThermometerIdStopRequest,
  simulatorThermometerAPI,
} from '@/api-client';
import { IRequestOptions, TUseMutationOptions } from '@/services/interface';
import { useMutation } from '@tanstack/react-query';

import { getAccessToken } from '..';

async function stopThermometerRequest(
  request: PostSimulatorThermometerIdStopRequest,
  requestOptions?: IRequestOptions
) {
  const jwt = getAccessToken();

  if (!jwt) {
    throw new Error('Please login first');
  }

  return simulatorThermometerAPI.postSimulatorThermometerIdStop(request, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
    signal: requestOptions?.signal,
  });
}

export function useStopThermometerMutation(
  options?: TUseMutationOptions<typeof stopThermometerRequest>
) {
  return useMutation({
    mutationKey: ['stopThermometerRequest'],
    mutationFn: stopThermometerRequest,
    ...options,
  });
}
