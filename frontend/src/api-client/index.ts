import {
  AuthApi,
  Configuration,
  SimulatorThermometerApi,
  UserApi,
} from '@iotdash/api-client';

export * from '@iotdash/api-client';

const config = new Configuration({
  basePath: 'http://localhost:8080/api/v1',
});

export const authAPI = new AuthApi(config);
export const userAPI = new UserApi(config);
export const simulatorThermometerAPI = new SimulatorThermometerApi(config);
