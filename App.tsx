/**
 * Samsung Wear OS Health Tracker App
 * Conecta con relojes Samsung Wear OS para recolectar datos de salud
 * y sincronizar automáticamente con Firebase cada 5 minutos
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HealthProvider } from './src/context/HealthContext';
import { MainScreen } from './src/components/MainScreen';
import { HistoryScreen } from './src/components/HistoryScreen';
import { colors } from './src/styles/globalStyles';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (routeName: string, focused: boolean, color: string, size: number) => {
  let iconName: string;
  
  if (routeName === 'Inicio') {
    iconName = 'dashboard';
  } else if (routeName === 'Historial') {
    iconName = 'history';
  } else {
    iconName = 'help';
  }
  
  return <Icon name={iconName} size={size} color={color} />;
};

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <HealthProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => 
                getTabBarIcon(route.name, focused, color, size),
              tabBarActiveTintColor: colors.primary,
              tabBarInactiveTintColor: colors.textSecondary,
              tabBarStyle: {
                backgroundColor: colors.surface,
                borderTopColor: colors.background,
                elevation: 8,
                height: 60,
                paddingBottom: 8,
                paddingTop: 8,
              },
              tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: '600',
              },
              headerShown: false,
            })}
          >
            <Tab.Screen 
              name="Inicio" 
              component={MainScreen}
              options={{
                tabBarLabel: 'Datos Actuales',
              }}
            />
            <Tab.Screen 
              name="Historial" 
              component={HistoryScreen}
              options={{
                tabBarLabel: 'Historial',
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </HealthProvider>
    </SafeAreaProvider>
  );
}

export default App;
