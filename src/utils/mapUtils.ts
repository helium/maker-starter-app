import { isFinite } from "lodash";

export type MapBounds = {
  ne: number[];
  sw: number[];
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
};

export const findBounds = (coords: number[][], paddingBottom = 250): MapBounds | undefined => {
  if (coords.length === 0) {
    return;
  }

  let minLng = coords[0][0];
  let maxLng = coords[0][0];
  let minLat = coords[0][1];
  let maxLat = coords[0][1];

  coords.forEach((m) => {
    const [lng, lat] = m;
    if (lng < minLng) {
      minLng = lng;
    }
    if (lng > maxLng) {
      maxLng = lng;
    }
    if (lat < minLat) {
      minLat = lat;
    }
    if (lat > maxLat) {
      maxLat = lat;
    }
  });

  if (!isFinite(minLng) || !isFinite(maxLng) || !isFinite(minLat) || !isFinite(maxLat)) {
    return;
  }

  return {
    ne: [maxLng, maxLat],
    sw: [minLng, minLat],
    paddingBottom,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30,
  };
};
