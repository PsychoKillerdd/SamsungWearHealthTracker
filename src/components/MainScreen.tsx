import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useHealth } from '../context/HealthContext';
import { HealthCard } from './HealthCard';
import { globalStyles, colors } from '../styles/globalStyles';

export const MainScreen: React.FC = () => {
  const { 
    latestData, 
    loading, 
    error, 
    lastSync,
    refreshData, 
    clearError 
  } = useHealth();

  const handleManualRefresh = async () => {
    try {
      await refreshData();
      Alert.alert('✅ Éxito', 'Datos actualizados correctamente');
    } catch (err) {
      Alert.alert('❌ Error', 'No se pudieron actualizar los datos');
    }
  };

  const handleErrorPress = () => {
    Alert.alert(
      'Error',
      error || 'Error desconocido',
      [
        { text: 'Reintentar', onPress: refreshData },
        { text: 'Cerrar', onPress: clearError },
      ]
    );
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ScrollView 
        style={globalStyles.container}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleManualRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        {/* Header */}
        <View style={globalStyles.spaceBetween}>
          <Text style={globalStyles.title}>
            Samsung Wear OS Health
          </Text>
          <View style={globalStyles.row}>
            <Icon name="watch" size={28} color={colors.primary} />
          </View>
        </View>

        {/* Estado de conexión */}
        <View style={globalStyles.row}>
          <Icon 
            name={loading ? "sync" : error ? "sync-problem" : "sync"} 
            size={16} 
            color={error ? colors.error : colors.success} 
          />
          <Text style={[globalStyles.label, { marginLeft: 8 }]}>
            {loading 
              ? 'Sincronizando...' 
              : error 
                ? 'Error de conexión' 
                : 'Conectado'
            }
          </Text>
        </View>

        {/* Error */}
        {error && (
          <TouchableOpacity onPress={handleErrorPress}>
            <View style={[globalStyles.card, { backgroundColor: '#FFEBEE' }]}>
              <View style={globalStyles.row}>
                <Icon name="error" size={20} color={colors.error} />
                <Text style={[globalStyles.errorText, { marginLeft: 8, textAlign: 'left' }]}>
                  {error}
                </Text>
              </View>
              <Text style={[globalStyles.label, { marginTop: 4 }]}>
                Toca para reintentar
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Loading */}
        {loading && !latestData && (
          <View style={globalStyles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[globalStyles.label, { marginTop: 16 }]}>
              Obteniendo datos del reloj Samsung...
            </Text>
          </View>
        )}

        {/* Datos de salud */}
        {latestData && (
          <>
            <HealthCard type="heartRate" data={latestData} onRefresh={refreshData} />
            <HealthCard type="steps" data={latestData} onRefresh={refreshData} />
            <HealthCard type="sleep" data={latestData} onRefresh={refreshData} />
            <HealthCard type="screenTime" data={latestData} onRefresh={refreshData} />
            
            {/* Timestamp */}
            <Text style={globalStyles.timestamp}>
              Última sincronización: {lastSync ? new Date(lastSync).toLocaleString() : 'Nunca'}
            </Text>
          </>
        )}

        {/* Sin datos */}
        {!latestData && !loading && (
          <View style={globalStyles.card}>
            <View style={globalStyles.center}>
              <Icon name="watch-later" size={48} color={colors.textSecondary} />
              <Text style={[globalStyles.label, { marginTop: 16, textAlign: 'center' }]}>
                No hay datos disponibles
              </Text>
              <Text style={[globalStyles.label, { textAlign: 'center' }]}>
                Asegúrate de que tu reloj Samsung esté conectado
              </Text>
            </View>
          </View>
        )}

        {/* Botón de actualización manual */}
        <TouchableOpacity 
          style={[globalStyles.button, loading && { opacity: 0.6 }]}
          onPress={handleManualRefresh}
          disabled={loading}
        >
          <View style={globalStyles.row}>
            <Icon name="refresh" size={20} color="#FFFFFF" />
            <Text style={[globalStyles.buttonText, { marginLeft: 8 }]}>
              {loading ? 'Sincronizando...' : 'Actualizar Ahora'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Info de sincronización automática */}
        <View style={[globalStyles.card, { backgroundColor: '#E3F2FD' }]}>
          <View style={globalStyles.row}>
            <Icon name="schedule" size={20} color={colors.primary} />
            <Text style={[globalStyles.label, { marginLeft: 8 }]}>
              Sincronización automática cada 5 minutos
            </Text>
          </View>
          <Text style={[globalStyles.label, { fontSize: 12, marginTop: 4 }]}>
            Los datos se guardan automáticamente en Firebase
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
