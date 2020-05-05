import { SharedModule } from "./components.module";

describe("SharedModule", () => {
  let SharedModule: SharedModule;

  beforeEach(() => {
    SharedModule = new SharedModule();
  });

  it("should create an instance", () => {
    expect(SharedModule).toBeTruthy();
  });
});
