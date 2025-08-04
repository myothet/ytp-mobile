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
  const [note, setNote] = useState('');

  const markAsDone = async () => {
    try {
      await axios.patch(
        `http://192.168.1.7:8000/api/complaints/${complaint.id}/`,
        {
          resolution_status: 'Done',
          resolution_notes: note,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      Alert.alert('Success', 'Complaint marked as resolved');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update complaint');
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
          <Text style={styles.label}>Phone: {complaint.contact_phone}</Text>
          <Text style={styles.label}>Address: {complaint.address}</Text>
          <Text style={styles.label}>DN/SN: {complaint.DN}/{complaint.Sn}</Text>
          <Text style={styles.label}>Details:</Text>
          <Text style={styles.detail}>{complaint.complaint_details}</Text>

          <Text style={styles.label}>Resolution Note:</Text>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Enter resolution note"
            multiline
            style={styles.input}
          />

          <View style={styles.buttonContainer}>
            <Button
              title="Mark as Done"
              onPress={markAsDone}
              color="#28a745"
              disabled={!note.trim()}
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
    minHeight: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: { marginTop: 20 },
});

export default ComplaintDetail;
