import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider } from './src/contexts/AppContext';
import { colors } from './src/styles/theme';

import ModeSelectionScreen from './src/screens/ModeSelectionScreen';
import ConfigScreen from './src/screens/ConfigScreen';
import InputScreen from './src/screens/InputScreen';
import ProcessingScreen from './src/screens/ProcessingScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import DownloadScreen from './src/screens/DownloadScreen';

export type RootStackParamList = {
  ModeSelection: undefined;
  Config: undefined;
  Input: undefined;
  Processing: undefined;
  Results: undefined;
  Download: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AppProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.primary}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ModeSelection"
          screenOptions={{
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.white,
            headerTitleStyle: { fontWeight: 'bold' },
            contentStyle: { backgroundColor: colors.light },
          }}
        >
          <Stack.Screen
            name="ModeSelection"
            component={ModeSelectionScreen}
            options={{ title: 'Resume Optimizer Pro' }}
          />
          <Stack.Screen
            name="Config"
            component={ConfigScreen}
            options={{ title: 'Configure AI' }}
          />
          <Stack.Screen
            name="Input"
            component={InputScreen}
            options={{ title: 'Your Resume' }}
          />
          <Stack.Screen
            name="Processing"
            component={ProcessingScreen}
            options={{ title: 'Optimizing...', headerBackVisible: false }}
          />
          <Stack.Screen
            name="Results"
            component={ResultsScreen}
            options={{ title: 'Optimized Resume' }}
          />
          <Stack.Screen
            name="Download"
            component={DownloadScreen}
            options={{ title: 'Download Resume' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
