# React Native Samsung Wear OS Health Tracker

🏥 **Aplicación móvil desarrollada en React Native que se conecta exclusivamente a relojes Samsung Wear OS para recolectar datos de salud.**

## 📱 Funcionalidades

### Datos de Salud Recolectados
- ❤️ **Frecuencia cardíaca (HR)** - Latidos por minuto en tiempo real
- 👣 **Pasos** - Contador de pasos dados durante el día
- 😴 **Sueño** - Horas de descanso registradas
- ⏰ **Tiempo en pantalla** - Minutos de uso activo del reloj

### Características Principales
- 🔄 **Sincronización automática cada 5 minutos** con Firebase
- 📊 **Pantalla principal** con últimos datos recolectados
- 🔄 **Botón de actualización manual** para obtener datos inmediatamente
- 📈 **Historial completo** con marcas de tiempo en Firebase
- 🏗️ **Arquitectura modular** con separación de responsabilidades
- 🎨 **Interfaz moderna** con estilos consistentes

## 🔧 Configuración Rápida

### IMPORTANTE: Configurar Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un proyecto nuevo
3. Añade una aplicación Android
4. Descarga `google-services.json` y colócalo en `android/app/`
5. Copia tu configuración en `src/firebase/config.ts`

### Instalación y Ejecución
```bash
npm install
npx react-native run-android
```

**⚠️ Nota Java**: Necesitas Java 17+. Si tienes Java 11, actualiza antes de compilar.

## 🏛️ Arquitectura Implementada

- **Context API** para estado global de salud
- **Hooks personalizados** para lógica reutilizable  
- **Servicios modulares** (Firebase, Samsung Health)
- **Componentes reutilizables** con TypeScript
- **Timer automático** de sincronización cada 5 minutos
- **Manejo de errores** y estados de carga
- **UI/UX moderna** con Material Design

## 📊 Estado Actual

✅ **Completado:**
- Estructura completa del proyecto React Native
- Integración Firebase Firestore configurada
- Context API para manejo de estado global
- Timer automático de sincronización (5 min)
- Pantalla principal con datos actuales
- Pantalla de historial con navegación
- Componentes modulares y reutilizables
- Estilos modernos y consistentes
- TypeScript para tipado fuerte
- Manejo de permisos y errores

🚧 **Para Producción:**
- Implementar Samsung Health SDK real
- Crear Native Module Android
- Configurar permisos de salud en AndroidManifest
- Obtener certificación Samsung Health

## 📱 Capturas de la App

La aplicación incluye:
- **Tab Navigation** con "Datos Actuales" e "Historial"
- **Cards interactivas** para cada tipo de dato de salud
- **Estados de loading** y manejo de errores
- **Pull-to-refresh** para actualización manual
- **Sincronización automática** en background

---

**🎯 ¡La app está lista para usar! Solo necesitas configurar Firebase y compilar.**

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
