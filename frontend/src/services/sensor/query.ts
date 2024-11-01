import { sensorAPI } from '@/services/api-client';
import { queryOptions, useQuery } from '@tanstack/react-query';

import { getAccessToken } from '..';
import { IRequestOptions } from '../interface';

export type Sensor = NonNullable<
  Awaited<ReturnType<typeof listSensor>>['data']
>[number];

async function listSensor(jwt: string, requestOptions?: IRequestOptions) {
  return sensorAPI.getSensors({
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    signal: requestOptions?.signal,
  });
}

export function listSensorQueryOptions() {
  const jwt = getAccessToken();

  return queryOptions({
    queryKey: ['listSensor', jwt],
    queryFn: ({ signal }) => listSensor(jwt, { signal }),
  });
}

export function useListSensor() {
  return useQuery({
    ...listSensorQueryOptions(),
  });
}

async function listSensorLogs(
  jwt: string,
  id: string,
  requestOptions?: IRequestOptions
) {
  return sensorAPI.getSensorsIdLogs(
    { id },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      signal: requestOptions?.signal,
    }
  );
}

export function listSensorLogsQueryOptions(id: string) {
  const jwt = getAccessToken();

  return queryOptions({
    queryKey: ['getSensorLogs', jwt, id],
    queryFn: ({ signal }) => listSensorLogs(jwt, id, { signal }),
  });
}

export function useListSensorLogs(id: string) {
  return useQuery({
    ...listSensorLogsQueryOptions(id),
    refetchInterval: 3000,
  });
}
