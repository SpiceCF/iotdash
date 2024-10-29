import { AuthApi, Configuration } from "./api-client";

describe("DefaultApi Test Suite", () => {
  let api: AuthApi;
  let accessToken: string;

  beforeAll(() => {
    const config = new Configuration({
      basePath: "http://localhost:8080/api/v1",
      apiKey(name) {
        return "Bearer " + accessToken;
      },
    });
    api = new AuthApi(config);
  });

  it("should handle error response", async () => {
    try {
      const registerRes = await api.postAuthRegister({
        body: {
          fullName: "test",
          email: "test@test.com",
          username: "username",
          password: "password",
        },
      });

      expect(registerRes.data).toBeDefined();
    } catch (error) {
      console.log(error);
    }
  });
});
