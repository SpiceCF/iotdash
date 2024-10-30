import { AuthApi, Configuration, UserApi } from '@iotdash/api-client';

const config = new Configuration({
  basePath: 'http://localhost:8080/api/v1',
});

export const authAPI = new AuthApi(config);
export const userAPI = new UserApi(config);
