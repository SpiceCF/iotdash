'use client';

import { authAPI, PostAuthRegisterRequest, userAPI } from '@/services/api-client';
import { IRequestOptions, TUseMutationOptions } from '@/services/interface';
import { queryOptions, useMutation } from '@tanstack/react-query';

import { getAccessToken } from '..';

async function registerRequest(
  request: PostAuthRegisterRequest,
  requestOptions?: IRequestOptions
) {
  return authAPI.postAuthRegister(request, {
    signal: requestOptions?.signal,
  });
}

export function useRegisterMutation(
  options?: TUseMutationOptions<typeof registerRequest>
) {
  return useMutation({
    mutationKey: ['registerRequest'],
    mutationFn: registerRequest,
    ...options,
  });
}

async function getProfileRequest(
  jwt: string,
  requestOptions?: IRequestOptions
) {
  return userAPI.getUsersMe({
    signal: requestOptions?.signal,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
}

export function getProfileQueryOptions() {
  const jwt = getAccessToken();

  return queryOptions({
    queryKey: ['getProfileRequest', jwt],
    queryFn: ({ signal }) => getProfileRequest(jwt, { signal }),
  });
}
