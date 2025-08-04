import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const ComplaintDetail = ({ route, navigation }) => {
  const { complaint } = route.params;
  const { token } = useAuth();

  const [snPower, setSnPower] = useState('');
  const [homePower, setHomePower] = useState('');
  const [resolvedStatus, setResolvedStatus] = useState('');

  const markAsDone = async () => {
    let parts = [];
  
    if (snPower.trim()) {
      parts.push(`Sn Power -> ${snPower.trim()}`);
    }
    if (homePower.trim()) {
      parts.push(`Home Power -> ${homePower.trim()}`);
    }
    if (resolvedStatus.trim()) {
      parts.push(`Resolved Status -> ${resolvedStatus.trim()}`);
    }
  
    if (parts.length === 0) {
      Alert.alert('Error', 'Please enter at least one resolution note.');
      return;
    }
  
    const combinedStatus = parts.join(', ');
  
    try {
      await axios.patch(
        `http://192.168.1.8:8000/api/complaints/${complaint.id}/`,
        {
          resolution_status: 'Done',
          resolution_notes: combinedStatus,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
  
      Alert.alert('Success', 'Complaint marked as Done and needs admin approval.');
      navigation.goBack();
    } catch (error) {
      console.error('Update failed', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to update complaint.');
    }
  };
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.label}>Ticket ID: {complaint.ticket_id}</Text>
          <Text style={styles.label}>Date: {new Date(complaint.complaint_date).toLocaleString()}</Text>
          <Text style={styles.label}>Customer: {complaint.customer_name}</Text>
          <Text style={styles.label}>Phone:</Text>
          {complaint.contact_phone?.split(',').map((num, idx) => (
          <Text key={idx} style={styles.detail}>📞 {num.trim()}</Text>
          ))}

          <Text style={styles.label}>Address: {complaint.address}</Text>
          <Text style={styles.label}>DN/SN: {complaint.DN}/{complaint.Sn}</Text>
          <Text style={styles.label}>Details:</Text>
          <Text style={styles.detail}>{complaint.complaint_details}</Text>

          <Text style={styles.label}>SN Power (optional):</Text>
          <TextInput
            value={snPower}
            onChangeText={setSnPower}
            placeholder="e.g., -18"
            keyboardType="numeric"
            style={styles.input}
          />

          <Text style={styles.label}>Home Power (optional):</Text>
          <TextInput
            value={homePower}
            onChangeText={setHomePower}
            placeholder="e.g., -20"
            keyboardType="numeric"
            style={styles.input}
          />

          <Text style={styles.label}>Resolved Notes (required):</Text>
          <TextInput
            value={resolvedStatus}
            onChangeText={setResolvedStatus}
            placeholder="e.g., Replaced fiber"
            multiline
            style={styles.input}
          />

          <View style={styles.buttonContainer}>
            <Button
              title="Mark as Done"
              onPress={markAsDone}
              color="#28a745"
              disabled={!resolvedStatus.trim()}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, fontWeight: '600', marginTop: 10 },
  detail: { fontSize: 15, color: '#333', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 8,
    borderRadius: 8,
    minHeight: 40,
    textAlignVertical: 'top',
  },
  buttonContainer: { marginTop: 20 },
});

export default ComplaintDetail;
