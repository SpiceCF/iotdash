import { UseMutationOptions } from '@tanstack/react-query';

export interface IRequestOptions {
  signal?: AbortSignal;
}

export type TUseMutationOptions<
  TMutationFunc extends (...args: never) => unknown,
> = UseMutationOptions<
  Awaited<ReturnType<TMutationFunc>>,
  Error,
  Parameters<TMutationFunc>[0]
>;
