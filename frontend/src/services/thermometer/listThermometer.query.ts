import { simulatorThermometerAPI } from '@/services/api-client';
import { queryOptions, useQuery } from '@tanstack/react-query';

import { getAccessToken } from '..';
import { IRequestOptions, TUseQueryOptions } from '../interface';

export type Thermometer = NonNullable<
  Awaited<ReturnType<typeof listThermometer>>['data']
>[number];

async function listThermometer(jwt: string, requestOptions?: IRequestOptions) {
  return simulatorThermometerAPI.getSimulatorThermometer({
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    signal: requestOptions?.signal,
  });
}

export function listThermometerQueryOptions(
  options?: TUseQueryOptions<typeof listThermometer>
) {
  const jwt = getAccessToken();

  return queryOptions({
    queryKey: ['listThermometer', jwt],
    queryFn: ({ signal }) => listThermometer(jwt, { signal }),
    ...options,
  });
}

export function useListThermometer(
  options?: TUseQueryOptions<typeof listThermometer>
) {
  return useQuery(listThermometerQueryOptions(options));
}

export type ThermometerHistory = NonNullable<
  Awaited<ReturnType<typeof listThermometerHistory>>['data']
>[number];

async function listThermometerHistory(
  { deviceID, jwt }: { deviceID: string; jwt: string },
  requestOptions?: IRequestOptions
) {
  return simulatorThermometerAPI.getSimulatorThermometerIdHistory(
    {
      id: deviceID,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      signal: requestOptions?.signal,
    }
  );
}

export function listThermometerHistoryQueryOptions(
  deviceID: string,
  options?: TUseQueryOptions<typeof listThermometerHistory>
) {
  const jwt = getAccessToken();

  return queryOptions({
    queryKey: ['listThermometerHistory', jwt, deviceID],
    queryFn: ({ signal }) =>
      listThermometerHistory({ deviceID, jwt }, { signal }),
    ...options,
  });
}

export function useListThermometerHistory(
  ...options: Parameters<typeof listThermometerHistoryQueryOptions>
) {
  return useQuery(listThermometerHistoryQueryOptions(...options));
}
