# 🚀 Guía Rápida para Ver la App en tu Teléfono

## 📱 Paso 1: Autorizar tu Teléfono
1. **En tu teléfono Android**: Ve a Configuración > Opciones de desarrollador
2. **Activa**: "Depuración USB" 
3. **Conecta** tu teléfono al PC con cable USB
4. **Aparecerá un popup** en tu teléfono pidiendo autorización
5. **Marca**: "Permitir siempre desde este equipo" y toca **PERMITIR**

## ☕ Paso 2: Actualizar Java (CRÍTICO)
Tu sistema tiene Java 11, pero necesitas Java 17-20.

### Descargar Java 17:
1. Ve a: https://adoptium.net/teapot/
2. Descarga **Eclipse Temurin 17** (LTS)
3. Instala el archivo descargado

### Configurar JAVA_HOME:
1. **Windows Key + R** → escribe `sysdm.cpl`
2. **Opciones avanzadas** → **Variables de entorno**
3. **Busca JAVA_HOME** → **Editar**
4. **Cambia la ruta** a tu nueva instalación Java 17:
   ```
   C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot
   ```

## 🏃‍♂️ Paso 3: Ejecutar la App
```bash
# Verificar que tu teléfono esté autorizado
$env:ANDROID_HOME\platform-tools\adb.exe devices

# Debería mostrar: 
# RFCY223WWNY     device

# Luego ejecutar la app
npx react-native run-android
```

## 🔧 Si Tienes Problemas

### Error "unauthorized device":
- Desconecta y reconecta el cable USB
- Revoca autorizaciones: Configuración > Opciones desarrollador > Revocar autorizaciones USB
- Vuelve a conectar y autorizar

### Error de Java:
- Reinicia PowerShell después de cambiar JAVA_HOME
- Verifica: `java -version` (debe mostrar 17.x.x)

### La app no se instala:
- Habilita "Instalar apps desconocidas" desde USB
- Ve a Configuración > Seguridad > Fuentes desconocidas

## 🎯 Resultado Esperado
Una vez funcionando verás:
- **Pantalla Principal**: Con datos simulados de salud
- **Tab "Historial"**: Lista de datos guardados
- **Sincronización automática**: Cada 5 minutos
- **Botón "Actualizar"**: Para refresh manual

---

## 🚀 Alternativa Rápida: Usar el Emulador
Si tienes problemas con el teléfono físico:

1. **Android Studio** → **AVD Manager**
2. **Create Virtual Device** → Selecciona un dispositivo
3. **Download** una imagen de sistema (API 30+)
4. **Start** el emulador
5. Ejecuta: `npx react-native run-android`

La app se instalará automáticamente en el emulador.
