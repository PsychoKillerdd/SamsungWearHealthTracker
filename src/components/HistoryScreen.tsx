import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useHealth } from '../context/HealthContext';
import { HealthData } from '../types/health';
import { globalStyles, colors } from '../styles/globalStyles';

// Componente para cada item del historial
const HistoryItem: React.FC<{ item: HealthData; index: number }> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  
  const handlePress = () => {
    setExpanded(!expanded);
  };
  
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  };
  
  const { date, time } = formatDate(item.timestamp);
  
  return (
    <TouchableOpacity 
      style={globalStyles.historyItem}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={globalStyles.spaceBetween}>
        <View>
          <Text style={globalStyles.subtitle}>{date}</Text>
          <Text style={globalStyles.label}>{time}</Text>
        </View>
        <Icon 
          name={expanded ? "expand-less" : "expand-more"} 
          size={24} 
          color={colors.textSecondary} 
        />
      </View>
      
      {expanded && (
        <View style={{ marginTop: 16 }}>
          <View style={globalStyles.row}>
            <Icon name="favorite" size={16} color={colors.heartRate} />
            <Text style={[globalStyles.label, { marginLeft: 8 }]}>
              FC: {item.heartRate} bpm
            </Text>
          </View>
          
          <View style={[globalStyles.row, { marginTop: 4 }]}>
            <Icon name="directions-walk" size={16} color={colors.steps} />
            <Text style={[globalStyles.label, { marginLeft: 8 }]}>
              Pasos: {item.steps.toLocaleString()}
            </Text>
          </View>
          
          <View style={[globalStyles.row, { marginTop: 4 }]}>
            <Icon name="hotel" size={16} color={colors.sleep} />
            <Text style={[globalStyles.label, { marginLeft: 8 }]}>
              Sueño: {item.sleep} h
            </Text>
          </View>
          
          <View style={[globalStyles.row, { marginTop: 4 }]}>
            <Icon name="screen-lock-portrait" size={16} color={colors.screenTime} />
            <Text style={[globalStyles.label, { marginLeft: 8 }]}>
              Pantalla: {item.screenTime} min
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export const HistoryScreen: React.FC = () => {
  const { history, loading, error, refreshData } = useHealth();
  
  const handleRefresh = async () => {
    try {
      await refreshData();
    } catch (err) {
      Alert.alert('Error', 'No se pudo actualizar el historial');
    }
  };
  
  const renderEmptyState = () => (
    <View style={[globalStyles.card, globalStyles.center]}>
      <Icon name="history" size={48} color={colors.textSecondary} />
      <Text style={[globalStyles.label, { marginTop: 16, textAlign: 'center' }]}>
        No hay historial disponible
      </Text>
      <Text style={[globalStyles.label, { textAlign: 'center' }]}>
        Los datos aparecerán aquí una vez que se sincronicen con tu reloj Samsung
      </Text>
    </View>
  );
  
  const renderError = () => (
    <View style={[globalStyles.card, { backgroundColor: '#FFEBEE' }]}>
      <View style={globalStyles.row}>
        <Icon name="error" size={20} color={colors.error} />
        <Text style={[globalStyles.errorText, { marginLeft: 8, textAlign: 'left' }]}>
          {error}
        </Text>
      </View>
    </View>
  );
  
  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={globalStyles.container}>
        {/* Header */}
        <View style={globalStyles.spaceBetween}>
          <Text style={globalStyles.title}>Historial de Datos</Text>
          <TouchableOpacity onPress={handleRefresh} disabled={loading}>
            <Icon 
              name="refresh" 
              size={28} 
              color={loading ? colors.textSecondary : colors.primary} 
            />
          </TouchableOpacity>
        </View>
        
        {/* Stats */}
        <View style={[globalStyles.card, { backgroundColor: '#E8F5E8' }]}>
          <View style={globalStyles.row}>
            <Icon name="bar-chart" size={20} color={colors.success} />
            <Text style={[globalStyles.label, { marginLeft: 8 }]}>
              Total de registros: {history.length}
            </Text>
          </View>
        </View>
        
        {/* Error */}
        {error && renderError()}
        
        {/* Lista de historial */}
        {history.length > 0 ? (
          <FlatList
            data={history}
            keyExtractor={(item, index) => `${item.timestamp}-${index}`}
            renderItem={({ item, index }) => (
              <HistoryItem item={item} index={index} />
            )}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        ) : (
          renderEmptyState()
        )}
        
        {/* Info */}
        <View style={[globalStyles.card, { backgroundColor: '#E3F2FD' }]}>
          <View style={globalStyles.row}>
            <Icon name="info" size={16} color={colors.primary} />
            <Text style={[globalStyles.label, { marginLeft: 8, fontSize: 12 }]}>
              Los datos se sincronizan automáticamente cada 5 minutos y se guardan en Firebase
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
