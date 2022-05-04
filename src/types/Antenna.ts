export type Antenna = {
  id: string;
  name: string;
  gain: number;
};

export const defaultAntenna: Antenna = {
  id: "freedomfi",
  name: "FreedomFi Antenna",
  gain: 1.2,
};

export const customAntenna: Antenna = {
  id: "custom",
  name: "Custom Antenna",
  gain: 1,
};

export const antennas = [defaultAntenna, customAntenna].map((antenna) => {
  return {
    ...antenna,
    label: antenna.name,
    value: antenna.id,
  };
});
