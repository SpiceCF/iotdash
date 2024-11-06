import {
  DefaultError,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

export interface IRequestOptions {
  signal?: AbortSignal;
}

export type TUseMutationOptions<
  TMutationFunc extends (...args: never) => unknown,
> = UseMutationOptions<
  Awaited<ReturnType<TMutationFunc>>,
  Error,
  Parameters<TMutationFunc>
>;

export type TUseQueryOptions<TQueryFunc extends (...args: never) => unknown> =
  Omit<
    UseQueryOptions<Awaited<ReturnType<TQueryFunc>>, DefaultError>,
    'queryKey' | 'queryFn'
  >;
