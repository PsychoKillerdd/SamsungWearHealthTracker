# Instrucciones de Configuración Firebase

## 🔥 Configuración Firebase - Paso a Paso

### 1. Crear Proyecto Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear un proyecto" 
3. Ingresa el nombre: `Samsung Wear Health Tracker`
4. Deshabilita Google Analytics (opcional)
5. Haz clic en "Crear proyecto"

### 2. Añadir App Android
1. En el dashboard del proyecto, haz clic en el ícono de Android
2. **Nombre del paquete Android**: `com.samsungwearhealthtracker`
3. **Nombre de la app**: `Samsung Wear Health Tracker`
4. **Certificado de firma SHA-1**: Déjalo vacío por ahora
5. Haz clic en "Registrar app"

### 3. Descargar google-services.json
1. Descarga el archivo `google-services.json`
2. Cópialo en la carpeta: `android/app/google-services.json`
3. **IMPORTANTE**: Este archivo debe estar en `android/app/`, NO en la raíz

### 4. Configurar Firestore Database
1. En la consola Firebase, ve a "Firestore Database"
2. Haz clic en "Crear base de datos"
3. Selecciona "Empezar en modo de prueba"
4. Elige una ubicación (ej: `nam5` para América)
5. Haz clic en "Listo"

### 5. Reglas de Firestore (Temporal para Desarrollo)
En la pestaña "Reglas", reemplaza con:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
**⚠️ IMPORTANTE**: Estas reglas son solo para desarrollo. En producción, implementa reglas de seguridad adecuadas.

### 6. Obtener Configuración Web
1. Ve a "Configuración del proyecto" (ícono de engranaje)
2. Baja hasta "Tus aplicaciones"
3. Verás tu app Android registrada
4. Haz clic en "Agregar app" > "Web" (necesario para obtener config)
5. Nombre: `Samsung Wear Web Config`
6. **NO** marcar "También configura Firebase Hosting"
7. Copia la configuración que aparece

### 7. Actualizar src/firebase/config.ts
Reemplaza el contenido de `src/firebase/config.ts` con tu configuración:

```typescript
export const firebaseConfig = {
  apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "samsung-wear-health-xxxxx.firebaseapp.com",
  projectId: "samsung-wear-health-xxxxx",
  storageBucket: "samsung-wear-health-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890",
  measurementId: "G-XXXXXXXXXX" // Opcional
};
```

### 8. Verificar Estructura de Archivos
Tu proyecto debe tener:
```
android/app/google-services.json  ✅
src/firebase/config.ts (actualizado) ✅
```

### 9. Compilar y Probar
```bash
npm install
npx react-native run-android
```

## 🔧 Solución de Problemas

### Error: "google-services.json not found"
- Verifica que el archivo esté en `android/app/google-services.json`
- NO en `android/google-services.json` o en la raíz del proyecto

### Error: "Firebase project not configured"
- Verifica que hayas actualizado `src/firebase/config.ts` con TU configuración
- No uses los valores placeholder "TU_API_KEY", etc.

### Error: "Permission denied" en Firestore
- Verifica las reglas de Firestore (paso 5)
- Asegúrate de haber seleccionado "modo de prueba"

### Error de Java Version
- Necesitas Java 17+
- Actualiza JAVA_HOME a Java 17

## ✅ Verificación Final

Una vez configurado correctamente:
1. La app debería compilar sin errores
2. Verás datos simulados en la pantalla principal
3. Los datos se guardan automáticamente en Firestore cada 5 minutos
4. Puedes ver los datos en Firebase Console > Firestore Database

**¡Listo! Tu app está completamente configurada y funcional.**
