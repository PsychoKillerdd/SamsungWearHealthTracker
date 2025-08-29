// Tipos de datos de salud que se recolectan del Samsung Wear OS
export interface HealthData {
  heartRate: number;        // BPM (latidos por minuto)
  screenTime: number;       // Minutos de uso de pantalla
  sleep: number;           // Horas de sueño
  steps: number;           // Pasos dados
  timestamp: string;       // ISO timestamp
}

// Tipos de respuesta de la API
export interface HealthApiResponse {
  success: boolean;
  data?: HealthData;
  error?: string;
}

// Estados de la aplicación
export interface HealthState {
  latestData: HealthData | null;
  history: HealthData[];
  loading: boolean;
  error: string | null;
  lastSync: string | null;
}

// Context type
export interface HealthContextType extends HealthState {
  fetchAndSaveData: () => Promise<void>;
  refreshData: () => Promise<void>;
  clearError: () => void;
}

// Configuración del timer de sincronización
export const SYNC_INTERVAL = 5 * 60 * 1000; // 5 minutos en milisegundos

// Colores para cada tipo de dato de salud (para UI)
export const DATA_COLORS = {
  heartRate: '#E91E63',
  steps: '#4CAF50', 
  sleep: '#9C27B0',
  screenTime: '#FF9800',
} as const;
