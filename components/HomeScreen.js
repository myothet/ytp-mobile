import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ComplaintCard from './ComplaintCard';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, ScrollView, ActivityIndicator, RefreshControl, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import isEqual from 'lodash.isequal';

const HomeScreen = ({ navigation }) => {
  const { token } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true); // only for initial load
  const [refreshing, setRefreshing] = useState(false); // for pull to refresh & auto updates

  const fetchComplaints = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      if (isRefresh) setRefreshing(true);

      const response = await axios.get(
        'http://192.168.1.8:8000/api/complaints/?resolution_status=Pending',
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      const newData = response.data.results;

      if (!isEqual(newData, complaints)) {
        setComplaints(newData);
      }
    } catch (error) {
      console.error('Error fetching complaints:', error.message);
    } finally {
      if (!isRefresh) setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchComplaints(false);

    const intervalId = setInterval(() => {
      fetchComplaints(true); // treat as refresh, no loading spinner
    }, 15000);

    return () => clearInterval(intervalId);
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      fetchComplaints(false);
    }, [token])
  );

  const onRefresh = () => fetchComplaints(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pending Complaints</Text>

      <View style={{ marginBottom: 10 }}>
        <Button title="Refresh" onPress={() => fetchComplaints(true)} />
      </View>

      {loading && complaints.length === 0 ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : complaints.length === 0 ? (
        <Text style={styles.emptyText}>No pending complaints.</Text>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {complaints.map((complaint) => (
            <ComplaintCard
              key={complaint.id}
              complaint={complaint}
              onPress={() =>
                navigation.navigate('ComplaintDetail', { complaint })
              }
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  },
});

export default HomeScreen;
