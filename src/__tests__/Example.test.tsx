import HotspotsScreen from "features/hotspots/root/HotspotsScreen";
import { cleanup, renderWithNav } from "utils/testUtils";

afterEach(cleanup);

describe("Test Hotspot Screen", () => {
  it("renders HotspotScreen.tsx", async () => {
    const hotspotScreen = renderWithNav(HotspotsScreen);
    const title = hotspotScreen.findByText("Add a\n[Placeholder] Miner");
    expect(title).toBeDefined();
  });
});
