import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  SafeAreaView,
  Image,
  Text,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';
import { RootStackParamList } from '../navigation/AppNavigator';

type AdicionaEditaUsuarioScreenRouteProp = RouteProp<RootStackParamList, 'AdicionaEditaUsuario'>;

const AdicionaEditaUsuarioScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const navigation = useNavigation();

  const route = useRoute<AdicionaEditaUsuarioScreenRouteProp>();

  const userToEdit = route.params?.user;

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setAvatar(userToEdit.avatar);
    }
  }, [userToEdit]);

  const handleSave = async () => {
    if (!name.trim() || !email.trim() || !avatar.trim()) {
      Alert.alert('Ops!', 'Todos os campos devem ser preenchidos!');
      return;
    }

    try {
      const usersJson = await AsyncStorage.getItem('users');
      let users: User[] = usersJson ? JSON.parse(usersJson) : [];

      if (userToEdit) {
        users = users.map((user) =>
          user.id === userToEdit.id ? { ...user, name, email, avatar } : user
        );
      } else {
        const newUser: User = {
          id: Date.now().toString(),
          name,
          email,
          avatar,
        };
        users.push(newUser);
      }

      await AsyncStorage.setItem('users', JSON.stringify(users));
      navigation.goBack();
    } catch (error) {
      console.error('Failed to save user.', error);
      Alert.alert('Erro', 'Não foi possível salvar o usuário.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatarPreview} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarPlaceholderText}>?</Text>
          </View>
        )}
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="URL do Avatar"
          value={avatar}
          onChangeText={setAvatar}
          autoCapitalize="none"
        />
        <Button title="Salvar" onPress={handleSave} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 20,
    alignItems: 'center',
  },
  avatarPreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e1e1e1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarPlaceholderText: {
    fontSize: 40,
    color: '#aaa',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
});


export default AdicionaEditaUsuarioScreen;