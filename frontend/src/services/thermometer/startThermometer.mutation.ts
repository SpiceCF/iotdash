import {
  PostSimulatorThermometerIdStartRequest,
  simulatorThermometerAPI,
} from '@/api-client';
import { IRequestOptions, TUseMutationOptions } from '@/services/interface';
import { useMutation } from '@tanstack/react-query';

import { getAccessToken } from '..';

async function startThermometerRequest(
  request: PostSimulatorThermometerIdStartRequest,
  requestOptions?: IRequestOptions
) {
  const jwt = getAccessToken();

  if (!jwt) {
    throw new Error('Please login first');
  }

  return simulatorThermometerAPI.postSimulatorThermometerIdStart(request, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
    signal: requestOptions?.signal,
  });
}

export function useStartThermometerMutation(
  options?: TUseMutationOptions<typeof startThermometerRequest>
) {
  return useMutation({
    mutationKey: ['startThermometerRequest'],
    mutationFn: startThermometerRequest,
    ...options,
  });
}
