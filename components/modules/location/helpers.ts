import type { LngLat, LngLatBounds } from '@yandex/ymaps3-types';

export const isPointInPolygon = (point: number[], geo: LngLat[][] | LngLat[][][]) => {
  const [x, y] = point;

  // Normalize to MultiPolygon structure
  const polygons =
    typeof geo[0][0][0] === 'number' ? [geo as number[][][]] : (geo as number[][][][]);

  for (const polygon of polygons) {
    let inside = false;

    for (const ring of polygon) {
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const [xi, yi] = ring[i];
        const [xj, yj] = ring[j];

        const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

        if (intersect) inside = !inside;
      }
    }

    if (inside) return true;
  }

  return false;
};

export function getBounds(coordinates: LngLat[]): LngLatBounds {
  let minLat = Infinity;
  let minLng = Infinity;
  let maxLat = -Infinity;
  let maxLng = -Infinity;

  for (const coords of coordinates) {
    const lat = coords[1];
    const lng = coords[0];

    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
  }

  return [
    [minLng, minLat],
    [maxLng, maxLat]
  ] as LngLatBounds;
}

export const getAllCoordinates = (coordinates: any): [number, number][] => {
  const result: [number, number][] = [];

  const recurse = (coords: any) => {
    if (Array.isArray(coords)) {
      if (coords.length === 2 && typeof coords[0] === 'number' && typeof coords[1] === 'number') {
        // Base case: LngLat [lng, lat]
        result.push([coords[0], coords[1]]);
      } else {
        // Recurse deeper for arrays (handles LngLat[], LngLat[][], LngLat[][][])
        coords.forEach((item: any) => recurse(item));
      }
    }
  };

  recurse(coordinates);
  return result;
};
