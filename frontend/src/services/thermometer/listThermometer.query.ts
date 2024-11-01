import { simulatorThermometerAPI } from '@/services/api-client';
import { queryOptions, useQuery } from '@tanstack/react-query';

import { getAccessToken } from '..';
import { IRequestOptions } from '../interface';

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

export function listThermometerQueryOptions() {
  const jwt = getAccessToken();

  return queryOptions({
    queryKey: ['listThermometer', jwt],
    queryFn: ({ signal }) => listThermometer(jwt, { signal }),
  });
}

export function useListThermometer() {
  return useQuery({
    ...listThermometerQueryOptions(),
  });
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

export function listThermometerHistoryQueryOptions(deviceID: string) {
  const jwt = getAccessToken();

  return queryOptions({
    queryKey: ['listThermometerHistory', jwt, deviceID],
    queryFn: ({ signal }) =>
      listThermometerHistory({ deviceID, jwt }, { signal }),
  });
}

export function useListThermometerHistory(deviceID: string) {
  return useQuery({
    ...listThermometerHistoryQueryOptions(deviceID),
    refetchInterval: 3000,
  });
}
