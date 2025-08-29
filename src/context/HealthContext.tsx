import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { fetchHealthDataFromWearOS, checkWearOSConnection, requestHealthPermissions } from '../services/samsungHealthService';
import { saveHealthDataToFirebase, getHealthHistory } from '../services/firebaseService';
import { HealthData, HealthContextType, SYNC_INTERVAL } from '../types/health';

// Crear el contexto
const HealthContext = createContext<HealthContextType | undefined>(undefined);

// Provider del contexto
export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [latestData, setLatestData] = useState<HealthData | null>(null);
  const [history, setHistory] = useState<HealthData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  
  const intervalRef = useRef<number | null>(null);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);

  /**
   * Actualiza el historial desde Firebase
   */
  const refreshHistory = useCallback(async () => {
    try {
      const historyData = await getHealthHistory(20);
      setHistory(historyData);
    } catch (err) {
      console.error('❌ Error actualizando historial:', err);
    }
  }, []);

  /**
   * Función principal para obtener y guardar datos de salud
   */
  const fetchAndSaveData = useCallback(async () => {
    if (loading) return; // Evitar múltiples llamadas simultáneas
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔄 Iniciando sincronización de datos de salud...');
      
      // Verificar conexión con el reloj
      const isConnected = await checkWearOSConnection();
      if (!isConnected) {
        throw new Error('No se pudo conectar con el reloj Samsung Wear OS');
      }
      
      // Obtener datos del reloj
      const newData = await fetchHealthDataFromWearOS();
      setLatestData(newData);
      
      // Guardar en Firebase
      await saveHealthDataToFirebase(newData);
      
      // Actualizar timestamp de última sincronización
      setLastSync(new Date().toISOString());
      
      // Actualizar historial
      await refreshHistory();
      
      console.log('✅ Sincronización completada exitosamente');
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      console.error('❌ Error en sincronización:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [loading, refreshHistory]);

  /**
   * Función para refrescar datos manualmente (botón)
   */
  const refreshData = useCallback(async () => {
    await fetchAndSaveData();
  }, [fetchAndSaveData]);

  /**
   * Limpiar errores
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Configurar timer automático de 5 minutos
   */
  const setupAutoSync = useCallback(() => {
    // Limpiar timer existente
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Crear nuevo timer SOLO si no existe uno
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        console.log('⏰ Timer automático: iniciando sincronización...');
        fetchAndSaveData();
      }, SYNC_INTERVAL);
      
      console.log(`⏰ Timer automático configurado: cada ${SYNC_INTERVAL / 1000 / 60} minutos`);
    }
  }, [fetchAndSaveData]);

  /**
   * Manejar cambios en el estado de la app
   */
  const handleAppStateChange = useCallback((nextAppState: AppStateStatus) => {
    console.log('📱 App state cambió:', appStateRef.current, '->', nextAppState);
    
    if (appStateRef.current.match(/inactive|background/) && nextAppState === 'active') {
      // App volvió al primer plano, sincronizar datos
      console.log('📱 App activa: sincronizando datos...');
      fetchAndSaveData();
    }
    
    appStateRef.current = nextAppState;
  }, [fetchAndSaveData]);

  /**
   * Solicitar permisos y configuración inicial
   */
  const initialize = useCallback(async () => {
    if (isInitialized) return; // Evitar múltiples inicializaciones
    
    try {
      console.log('🚀 Inicializando HealthProvider...');
      setIsInitialized(true);
      
      // Solicitar permisos de salud
      const permissionsGranted = await requestHealthPermissions();
      if (!permissionsGranted) {
        setError('Permisos de salud no concedidos');
        return;
      }
      
      // Cargar historial inicial
      await refreshHistory();
      
      // Primera sincronización
      await fetchAndSaveData();
      
      // Configurar timer automático
      setupAutoSync();
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error de inicialización';
      console.error('❌ Error en inicialización:', errorMessage);
      setError(errorMessage);
    }
  }, [isInitialized, fetchAndSaveData, refreshHistory, setupAutoSync]);

  // Efectos
  useEffect(() => {
    // Configurar listener del estado de la app
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    
    // Inicializar solo una vez
    if (!isInitialized) {
      initialize();
    }
    
    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      subscription.remove();
    };
  }, [isInitialized, initialize, handleAppStateChange]);

  // Valor del contexto
  const contextValue: HealthContextType = {
    latestData,
    history,
    loading,
    error,
    lastSync,
    fetchAndSaveData,
    refreshData,
    clearError,
  };

  return (
    <HealthContext.Provider value={contextValue}>
      {children}
    </HealthContext.Provider>
  );
};

/**
 * Hook para usar el contexto de salud
 */
export const useHealth = (): HealthContextType => {
  const context = useContext(HealthContext);
  if (context === undefined) {
    throw new Error('useHealth debe ser usado dentro de un HealthProvider');
  }
  return context;
};
