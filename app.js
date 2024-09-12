import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, Button, StyleSheet, View } from 'react-native';
import axios from 'axios';

const App = () => {
  const [sensorData, setSensorData] = useState({});
  const [recommendation, setRecommendation] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.example.com/sensordata');
      setSensorData(response.data);
      getRecommendation(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getRecommendation = (data) => {
    if (data.soilMoisture < 30) {
      setRecommendation('Water your crops');
    } else if (data.temperature > 35) {
      setRecommendation('Provide shade for your crops');
    } else {
      setRecommendation('Your crops are in good condition!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Smart Agricultural Monitoring</Text>
      <View style={styles.dataContainer}>
        <Text>Soil Moisture: {sensorData.soilMoisture}</Text>
        <Text>Temperature: {sensorData.temperature}°C</Text>
        <Text>Rainfall: {sensorData.rainfall}mm</Text>
      </View>
      <Text style={styles.recommendation}>{recommendation}</Text>
      <Button title="Refresh Data" onPress={fetchData} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  dataContainer: {
    marginBottom: 20,
  },
  recommendation: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
  },
});

export default App;
