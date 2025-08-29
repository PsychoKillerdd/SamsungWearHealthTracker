import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HealthData } from '../types/health';
import { globalStyles, colors, healthCardStyles } from '../styles/globalStyles';

interface HealthCardProps {
  type: 'heartRate' | 'steps' | 'sleep' | 'screenTime';
  data: HealthData;
  onRefresh?: () => void;
}

// Configuración de cada tipo de dato
const cardConfigs = {
  heartRate: {
    title: 'Frecuencia Cardíaca',
    icon: 'favorite',
    getValue: (data: HealthData) => data.heartRate,
    unit: 'bpm',
    color: colors.heartRate,
    description: 'Ritmo cardíaco actual',
  },
  steps: {
    title: 'Pasos',
    icon: 'directions-walk',
    getValue: (data: HealthData) => data.steps,
    unit: 'pasos',
    color: colors.steps,
    description: 'Pasos dados hoy',
  },
  sleep: {
    title: 'Sueño',
    icon: 'hotel',
    getValue: (data: HealthData) => data.sleep,
    unit: 'horas',
    color: colors.sleep,
    description: 'Horas de descanso',
  },
  screenTime: {
    title: 'Tiempo en Pantalla',
    icon: 'screen-lock-portrait',
    getValue: (data: HealthData) => data.screenTime,
    unit: 'min',
    color: colors.screenTime,
    description: 'Tiempo activo del reloj',
  },
};

export const HealthCard: React.FC<HealthCardProps> = ({ type, data, onRefresh }) => {
  const config = cardConfigs[type];
  
  const handleCardPress = () => {
    Alert.alert(
      config.title,
      `${config.description}: ${config.getValue(data)} ${config.unit}\\n\\nÚltima actualización: ${new Date(data.timestamp).toLocaleString()}`,
      [
        { text: 'OK' },
        onRefresh && { text: 'Actualizar', onPress: onRefresh },
      ].filter(Boolean) as any
    );
  };

  return (
    <TouchableOpacity 
      style={[globalStyles.healthCard, healthCardStyles[type]]}
      onPress={handleCardPress}
      activeOpacity={0.7}
    >
      <View style={globalStyles.spaceBetween}>
        <View style={globalStyles.iconRow}>
          <Icon name={config.icon} size={24} color={config.color} />
          <Text style={[globalStyles.iconText, { color: config.color }]}>
            {config.title}
          </Text>
        </View>
      </View>
      
      <View style={globalStyles.row}>
        <Text style={[globalStyles.value, { color: config.color }]}>
          {config.getValue(data)}
        </Text>
        <Text style={[globalStyles.unit, { marginLeft: 8 }]}>
          {config.unit}
        </Text>
      </View>
      
      <Text style={globalStyles.label}>
        {config.description}
      </Text>
    </TouchableOpacity>
  );
};
