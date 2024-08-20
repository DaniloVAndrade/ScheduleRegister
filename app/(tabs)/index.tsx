import React, { useState, useEffect } from 'react';
import { Alert, Button, StyleSheet, TextInput, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';

export default function TabOneScreen() {
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const router = useRouter(); // Hook para navegação

  useEffect(() => {
    const loadData = async () => {
      const storedNome = await AsyncStorage.getItem('nome');
      const storedMatricula = await AsyncStorage.getItem('matricula');
      if (storedNome) setNome(storedNome);
      if (storedMatricula) setMatricula(storedMatricula);
    };
    loadData();
  }, []);

  const onPressLogin = () => {
    if (nome && matricula) {
      Alert.alert('Logado com sucesso!');
      router.push('/Home'); 
    } else {
      Alert.alert('Insira o nome e a matrícula.');
    }
  };

  const onPressCadastro = async () => {
    if (nome && matricula) {
      await AsyncStorage.setItem('nome', nome);
      await AsyncStorage.setItem('matricula', matricula);
      Alert.alert('Cadastro realizado com sucesso!');
    } else {
      Alert.alert('Insira o nome e a matrícula');
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('./iconeLogin.png')}
        style={[styles.image, {tintColor: '#007bff'}]}
      />
      <TextInput 
        placeholder='Digite o seu nome completo'
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput 
        placeholder='Digite a matrícula'
        value={matricula}
        onChangeText={setMatricula}
        keyboardType='numeric'
        style={styles.input}
      />
      <View style={styles.button}>
        <Button onPress={onPressLogin} title='Login'/>
      </View>
      <View style={styles.button}>
        <Button onPress={onPressCadastro} title='Cadastrar'/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    width: '100%',
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  image: {
    width: 150,  
    height: 150, 
    marginBottom: 40, 
  },
});
