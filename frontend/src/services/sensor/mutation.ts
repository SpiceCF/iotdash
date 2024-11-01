import { PostSensorsRequest, sensorAPI } from '@/services/api-client';
import { IRequestOptions, TUseMutationOptions } from '@/services/interface';
import { useMutation } from '@tanstack/react-query';

import { getAccessToken } from '..';

async function createSensorRequest(
  request: PostSensorsRequest,
  requestOptions?: IRequestOptions
) {
  const jwt = getAccessToken();

  return sensorAPI.postSensors(request, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
    signal: requestOptions?.signal,
  });
}

export function useCreateSensorMutation(
  options?: TUseMutationOptions<typeof createSensorRequest>
) {
  return useMutation({
    mutationKey: ['createThermometerRequest'],
    mutationFn: createSensorRequest,
    ...options,
  });
}
