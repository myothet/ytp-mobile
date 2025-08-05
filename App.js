import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AuthProvider, useAuth } from './contexts/AuthContext';

import Login from './components/Login';
import HomeScreen from './components/HomeScreen';
import Bunner from './components/Bunner';
import Footer from './components/Footer';
import Welcome from './components/Welcome';
import ChangePassword from './components/ChangePassword';
import Logout from './components/Logout';
import ComplaintDetail from './components/ComplaintDetail';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function AppDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: true }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Change Password" component={ChangePassword} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
}

// AuthFlow handles the authentication stack and main app stack after login
function AuthFlow() {
  const { token } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <>
          <Stack.Screen name="AppDrawer" component={AppDrawer} />
          <Stack.Screen name="ComplaintDetail" component={ComplaintDetail} />
        </>
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
}

// RootNavigator manages the very first welcome screen and then the AuthFlow
function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="AuthFlow" component={AuthFlow} />
      
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <View style={styles.container}>
          <Bunner />
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
          <Footer />
        </View>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
