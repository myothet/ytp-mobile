import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function Logout({ navigation }) {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    navigation.replace('Login'); // or Welcome
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <Text>Logging out...</Text>
    </View>
  );
}
