import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'; // assumes token is in AuthContext

export default function ChangePassword() {
  const [lspName, setLspName] = useState('');
  const [newPass, setNewPass] = useState('');
  const { token } = useAuth(); // your auth context should provide token

  const handleChange = async () => {
    if (!lspName || !newPass) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post(
        'http://192.168.1.7:8000/api/update-user-password/', // adjust path if needed
        {
          Lsp_Name: lspName,
          new_password: newPass,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      Alert.alert('Success', response.data.status);
      setLspName('');
      setNewPass('');
    } catch (error) {
      const errMsg =
        error.response?.data?.error || 'Failed to update password';
      Alert.alert('Error', errMsg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change LSP Password</Text>

      <TextInput
        placeholder="LSP Name"
        value={lspName}
        onChangeText={setLspName}
        style={styles.input}
      />

      <TextInput
        secureTextEntry
        placeholder="New Password"
        value={newPass}
        onChangeText={setNewPass}
        style={styles.input}
      />

      <Button title="Update Password" onPress={handleChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 10,
    borderRadius: 5,
  },
});
