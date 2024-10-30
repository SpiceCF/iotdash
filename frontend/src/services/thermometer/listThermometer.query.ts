import { simulatorThermometerAPI } from '@/api-client';
import { queryOptions, useQuery } from '@tanstack/react-query';

import { getAccessToken } from '..';
import { IRequestOptions } from '../interface';

async function listThermometer(jwt: string, requestOptions?: IRequestOptions) {
  return simulatorThermometerAPI.getSimulatorThermometer({
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    signal: requestOptions?.signal,
  });
}

export function listThermometerQueryOptions() {
  const jwt = getAccessToken();

  if (!jwt) {
    throw new Error('Please login first');
  }

  return queryOptions({
    queryKey: ['listThermometer', jwt],
    queryFn: ({ signal }) => listThermometer(jwt, { signal }),
  });
}

export type Thermometer = NonNullable<
  Awaited<ReturnType<typeof listThermometer>>['data']
>[number];

export function useListThermometer() {
  return useQuery({
    ...listThermometerQueryOptions(),
  });
}
