import React from 'react';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';

// Screens
import { Home } from './src/screens'

// Hooks
import { AuthProvider } from './src/hooks/Auth';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <AuthProvider >
      <StatusBar
        style="light"
        translucent
        backgroundColor="transparent"
      />
      <Home />
    </AuthProvider>
  );
}