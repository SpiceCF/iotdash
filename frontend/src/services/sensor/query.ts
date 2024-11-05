import {
  GetSensorsIdLogsMetricRequest,
  sensorAPI,
} from '@/services/api-client';
import {
  DefaultError,
  queryOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

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

export function listSensorQueryOptions(
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof listSensor>>, DefaultError>,
    'queryKey' | 'queryFn'
  >
) {
  const jwt = getAccessToken();

  return queryOptions({
    queryKey: ['listSensor', jwt],
    queryFn: ({ signal }) => listSensor(jwt, { signal }),
    ...options,
  });
}

export function useListSensor(
  options?: Parameters<typeof listSensorQueryOptions>[0]
) {
  return useQuery(listSensorQueryOptions(options));
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

export function listSensorLogsQueryOptions(
  id: string,
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof listSensorLogs>>, DefaultError>,
    'queryKey' | 'queryFn'
  >
) {
  const jwt = getAccessToken();

  return queryOptions({
    queryKey: ['getSensorLogs', jwt, id],
    queryFn: ({ signal }) => listSensorLogs(jwt, id, { signal }),
    ...options,
  });
}

export function useListSensorLogs(
  ...options: Parameters<typeof listSensorLogsQueryOptions>
) {
  return useQuery(listSensorLogsQueryOptions(...options));
}

async function listSensorMetricLogs(
  jwt: string,
  reqParams: GetSensorsIdLogsMetricRequest,
  requestOptions?: IRequestOptions
) {
  return sensorAPI.getSensorsIdLogsMetric(reqParams, {
    headers: { Authorization: `Bearer ${jwt}` },
    signal: requestOptions?.signal,
  });
}

export function listSensorMetricLogsQueryOptions(
  reqParams: GetSensorsIdLogsMetricRequest,
  options?: Omit<
    UseQueryOptions<
      Awaited<ReturnType<typeof listSensorMetricLogs>>,
      DefaultError
    >,
    'queryKey' | 'queryFn'
  >
) {
  const jwt = getAccessToken();

  return queryOptions({
    queryKey: ['getSensorMetricLogs', jwt, reqParams],
    queryFn: ({ signal }) => listSensorMetricLogs(jwt, reqParams, { signal }),
    ...options,
  });
}

export function useListSensorMetricLogs(
  ...options: Parameters<typeof listSensorMetricLogsQueryOptions>
) {
  return useQuery(listSensorMetricLogsQueryOptions(...options));
}
