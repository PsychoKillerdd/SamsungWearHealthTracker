import { StyleSheet } from 'react-native';

// Paleta de colores moderna
export const colors = {
  primary: '#1976D2',      // Azul Samsung
  primaryDark: '#1565C0',  
  secondary: '#64B5F6',    // Azul claro
  background: '#F5F6FA',   // Gris muy claro
  surface: '#FFFFFF',      // Blanco
  card: '#FFFFFF',         
  text: '#212121',         // Gris oscuro
  textSecondary: '#757575', // Gris medio
  success: '#4CAF50',      // Verde
  warning: '#FF9800',      // Naranja
  error: '#F44336',        // Rojo
  heartRate: '#E91E63',    // Rosa para HR
  steps: '#4CAF50',        // Verde para pasos
  sleep: '#9C27B0',        // Púrpura para sueño
  screenTime: '#FF9800',   // Naranja para tiempo pantalla
};

// Estilos globales
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },

  // Títulos y texto
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },

  label: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
    fontWeight: '500',
  },

  value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },

  unit: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '400',
  },

  // Tarjetas
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },

  healthCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 4,
  },

  // Botones
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginVertical: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginVertical: 8,
  },

  secondaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Estados
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },

  errorText: {
    color: colors.error,
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 8,
    fontWeight: '500',
  },

  successText: {
    color: colors.success,
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 8,
    fontWeight: '500',
  },

  // Layout helpers
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Timestamp
  timestamp: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'right',
    marginTop: 8,
    fontStyle: 'italic',
  },

  // Historial
  historyItem: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    borderLeftWidth: 3,
    borderLeftColor: colors.secondary,
  },

  // Icono + texto
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  iconText: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
});

// Estilos específicos para tipos de datos de salud
export const healthCardStyles = {
  heartRate: { borderLeftColor: colors.heartRate },
  steps: { borderLeftColor: colors.steps },
  sleep: { borderLeftColor: colors.sleep },
  screenTime: { borderLeftColor: colors.screenTime },
};
