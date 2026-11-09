/**
 * Motor Matemático de Geofencing para Validação de Presença de Campo
 * Utiliza a fórmula de Haversine para calcular a distância exata em metros entre
 * as coordenadas do GPS do técnico e o ponto de ancoragem físico da piscina.
 */

export interface GpsCoordinates {
  lat: number;
  lng: number;
}

export interface GeofenceValidationResult {
  isWithinGeofence: boolean;
  distanceMeters: number;
  radiusAllowedMeters: number;
  message: string;
}

/**
 * Raio padrão de tolerância: 50 metros da borda da piscina
 */
export const DEFAULT_GEOFENCE_RADIUS_METERS = 50;

/**
 * Calcula a distância em metros entre duas coordenadas geográficas (Haversine)
 */
export function calculateDistanceMeters(coord1: GpsCoordinates, coord2: GpsCoordinates): number {
  const R = 6371e3; // Raio da Terra em metros
  const φ1 = (coord1.lat * Math.PI) / 180;
  const φ2 = (coord2.lat * Math.PI) / 180;
  const Δφ = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const Δλ = ((coord2.lng - coord1.lng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

/**
 * Valida se o check-in do técnico ocorreu dentro do raio seguro da piscina
 */
export function validateGeofencePresence(
  technicianGps: GpsCoordinates,
  poolGps: GpsCoordinates,
  radiusAllowedMeters: number = DEFAULT_GEOFENCE_RADIUS_METERS
): GeofenceValidationResult {
  const distance = calculateDistanceMeters(technicianGps, poolGps);
  const isWithin = distance <= radiusAllowedMeters;

  return {
    isWithinGeofence: isWithin,
    distanceMeters: distance,
    radiusAllowedMeters,
    message: isWithin
      ? `Presença física validada na borda da piscina (${distance}m do ponto central).`
      : `Alerta de Geofencing: O técnico está a ${distance}m da piscina (limite máximo permitido: ${radiusAllowedMeters}m).`,
  };
}
