import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const ComplaintCard = ({ complaint, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] },
      ]}
    >
      <Text style={styles.name}>{complaint.customer_name}</Text>
      <Text style={styles.phone}>{complaint.contact_phone}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 16,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    // Android elevation
    elevation: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  phone: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});

export default ComplaintCard;
