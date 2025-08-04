import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Yatanarpon Teleport</Text>
      <Pressable style={styles.button} onPress={() => navigation.replace('AuthFlow')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    gap: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    width: '80%',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1877F2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '60%'
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
