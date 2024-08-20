import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

interface Record {
  type: 'Entrada' | 'Saída';
  time: string;
}

export default function TabHome() {
  const [nome, setNome] = useState<string>('');
  const [records, setRecords] = useState<Record[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadUserData = async () => {
      const storedNome = await AsyncStorage.getItem('nome');
      const storedRecords = await AsyncStorage.getItem('records');
      if (storedNome) setNome(storedNome);
      if (storedRecords) setRecords(JSON.parse(storedRecords));
    };
    loadUserData();
  }, []);

  const handleEntry = async () => {
    const currentTime = new Date().toLocaleString();
    const newRecord: Record = { type: 'Entrada', time: currentTime };
    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);
    await AsyncStorage.setItem('records', JSON.stringify(updatedRecords));
  };

  const handleExit = async () => {
    const currentTime = new Date().toLocaleString();
    const newRecord: Record = { type: 'Saída', time: currentTime };
    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);
    await AsyncStorage.setItem('records', JSON.stringify(updatedRecords));
  };

  const handleLogout = () => {
    router.push('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Bem Vindo, {nome}!</Text>
        <Button onPress={handleLogout} title="Logout" />
      </View>
      
      <View style={styles.buttonsContainer}>
        <Button onPress={handleEntry} title="Registrar Entrada" />
        <Button onPress={handleExit} title="Registrar Saída" />
      </View>

      <FlatList
        data={records}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.record}>
            <Text>{item.type}: {item.time}</Text>
          </View>
        )}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  record: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  list: {
    marginTop: 10,
  },
});
