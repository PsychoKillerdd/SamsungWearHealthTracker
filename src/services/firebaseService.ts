import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { HealthData } from '../types/health';

const HEALTH_COLLECTION = 'healthData';

/**
 * Guarda los datos de salud en Firebase Firestore
 */
export const saveHealthDataToFirebase = async (data: HealthData): Promise<void> => {
  try {
    const docRef = await addDoc(collection(db, HEALTH_COLLECTION), {
      ...data,
      createdAt: new Date(),
    });
    console.log('✅ Datos guardados en Firebase con ID:', docRef.id);
  } catch (error) {
    console.error('❌ Error guardando en Firebase:', error);
    throw new Error('Error al guardar datos en Firebase');
  }
};

/**
 * Obtiene el historial de datos de salud desde Firebase
 */
export const getHealthHistory = async (limitCount: number = 50): Promise<HealthData[]> => {
  try {
    const q = query(
      collection(db, HEALTH_COLLECTION),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const history: HealthData[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      history.push({
        heartRate: data.heartRate,
        screenTime: data.screenTime,
        sleep: data.sleep,
        steps: data.steps,
        timestamp: data.timestamp,
      });
    });
    
    console.log(`✅ Historial obtenido: ${history.length} registros`);
    return history;
  } catch (error) {
    console.error('❌ Error obteniendo historial:', error);
    throw new Error('Error al obtener historial de Firebase');
  }
};

/**
 * Obtiene el último registro de datos de salud
 */
export const getLatestHealthData = async (): Promise<HealthData | null> => {
  try {
    const history = await getHealthHistory(1);
    return history.length > 0 ? history[0] : null;
  } catch (error) {
    console.error('❌ Error obteniendo último registro:', error);
    return null;
  }
};
