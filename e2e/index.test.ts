import { DefaultApi } from "./api-client/apis";
import { Configuration } from "./api-client/runtime";

describe("DefaultApi Test Suite", () => {
  let api: DefaultApi;
  let accessToken: string;

  beforeAll(() => {
    const config = new Configuration({
      basePath: "https://httpbin.org/anything",
      accessToken: accessToken,
    });
    api = new DefaultApi(config);
  });

  it("should handle error response", async () => {
    try {
      const registerRes = await api.registerRaw({
        user: {
          fullName: "test",
          email: "test@test.com",
          username: "username",
          password: "password",
        },
      });

      console.log(await registerRes.raw.json());
    } catch (error) {
      console.log(error);
    }
  });
});
