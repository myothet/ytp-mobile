import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Button,
} from 'react-native';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import ComplaintCard from './ComplaintCard';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const { token } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'http://192.168.1.8:8000/api/complaints/?resolution_status=Pending',
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      setComplaints(response.data.results);
    } catch (error) {
      console.error('Error fetching complaints:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Auto fetch every 15 seconds
  useEffect(() => {
    if (!token) return;

    fetchComplaints(); // initial fetch

    const intervalId = setInterval(() => {
      fetchComplaints();
    }, 15000);

    return () => clearInterval(intervalId);
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      fetchComplaints();
    }, [token])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchComplaints();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pending Complaints</Text>

      {/* Add Refresh button */}
      <View style={{ marginBottom: 10 }}>
        <Button title="Refresh" onPress={fetchComplaints} />
      </View>

      {loading ? (
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
