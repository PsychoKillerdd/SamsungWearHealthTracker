import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);

// Para desarrollo local (opcional)
// if (__DEV__) {
//   connectFirestoreEmulator(db, 'localhost', 8080);
// }

export default app;
