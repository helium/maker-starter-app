import { cleanup, renderWithNav } from "utils/testUtils";
import HotspotsScreen from "features/hotspots/root/HotspotsScreen";

afterEach(cleanup);

describe("Test Hotspot Screen", () => {
  it("renders HotspotScreen.tsx", async () => {
    const hotspotScreen = renderWithNav(HotspotsScreen);
    const title = hotspotScreen.findByText("Add a\n[Placeholder] Miner");
    expect(title).toBeDefined();
  });
});
