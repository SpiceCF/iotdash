import {
  AuthApi,
  Configuration,
  SimulatorThermometerApi,
  SensorApi,
} from "./api-client";

describe("DefaultApi Test Suite", () => {
  let authAPI: AuthApi;
  let tmAPI: SimulatorThermometerApi;
  let sensorAPI: SensorApi;

  let accessToken: string;
  let thermometerID: string;
  let sensorID: string;

  beforeAll(() => {
    const config = new Configuration({
      basePath: "http://localhost:8080/api/v1",
      apiKey(name) {
        return "Bearer " + accessToken;
      },
    });
    authAPI = new AuthApi(config);
    tmAPI = new SimulatorThermometerApi(config);
    sensorAPI = new SensorApi(config);
  });

  it("should handle error response", async () => {
    try {
      const registerRes = await authAPI.postAuthRegister({
        body: {
          fullName: "test",
          email: "test@test.com",
          username: "testuser",
          password: "testpassword",
        },
      });

      expect(registerRes.data).toBeDefined();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should have token after login", async () => {
    const loginRes = await authAPI.postAuthLogin({
      body: {
        username: "testuser",
        password: "testpassword",
      },
    });

    expect(loginRes.data?.token).toBeDefined();
    if (loginRes.data) accessToken = loginRes.data.token!!;
  });

  it("should have thermometer", async () => {
    const createTMRes = await tmAPI.postSimulatorThermometer({
      body: {
        config: {
          connection: "http://localhost:8080/api/v1/sensors/thermometer/logs",
          maxTemperature: 100,
          minTemperature: 10,
        },
      },
    });

    expect(createTMRes.data?.id).toBeDefined();

    if (createTMRes.data)
      thermometerID = createTMRes.data.id!! as unknown as string;
  });

  it("should have sensor", async () => {
    const createSensorRes = await sensorAPI.postSensors({
      body: {
        deviceId: thermometerID as unknown as object,
        type: "thermometer",
        name: "bedroom",
      },
    });

    expect(createSensorRes.data?.id).toBeDefined();

    if (createSensorRes.data)
      sensorID = createSensorRes.data.id!! as unknown as string;
  });

  it("should stop/stop thermometer", async () => {
    const startTMRes = await tmAPI.postSimulatorThermometerIdStart({
      id: thermometerID,
    });

    expect(startTMRes.status).toBe(200);

    const getTMResAfterStart = await tmAPI.getSimulatorThermometerId({
      id: thermometerID,
    });

    expect(getTMResAfterStart.data?.isActive).toBe(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const stopTMRes = await tmAPI.postSimulatorThermometerIdStop({
      id: thermometerID,
    });

    expect(stopTMRes.status).toBe(200);

    const getTMResAfterStop = await tmAPI.getSimulatorThermometerId({
      id: thermometerID,
    });

    expect(getTMResAfterStop.data?.isActive).toBe(false);

    const getTMHistoryRes = await tmAPI.getSimulatorThermometerIdHistory({
      id: thermometerID,
    });

    expect(getTMHistoryRes.data?.length).toBeGreaterThan(0);
  });

  it("should have sensor logs", async () => {
    const getSensorLogsRes = await sensorAPI.getSensorsIdLogs({
      id: sensorID,
    });

    expect(getSensorLogsRes.data?.length).toBeGreaterThan(0);
  });
});
