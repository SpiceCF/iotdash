import {
  PostSimulatorThermometerRequest,
  simulatorThermometerAPI,
} from '@/api-client';
import { IRequestOptions, TUseMutationOptions } from '@/services/interface';
import { useMutation } from '@tanstack/react-query';

import { getAccessToken } from '..';

async function createThermometerRequest(
  request: PostSimulatorThermometerRequest,
  requestOptions?: IRequestOptions
) {
  const jwt = getAccessToken();

  return simulatorThermometerAPI.postSimulatorThermometer(request, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
    signal: requestOptions?.signal,
  });
}

export function useCreateThermometerMutation(
  options?: TUseMutationOptions<typeof createThermometerRequest>
) {
  return useMutation({
    mutationKey: ['createThermometerRequest'],
    mutationFn: createThermometerRequest,
    ...options,
  });
}
