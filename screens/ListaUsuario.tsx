import React, { useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, SafeAreaView, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';
import { RootStackParamList } from '../navigation/AppNavigator';

type ListaUsuarioScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ListaUsuario'>;

const ListaUsuarioScreen: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const navigation = useNavigation<ListaUsuarioScreenNavigationProp>();

  const loadUsers = useCallback(async () => {
    try {
      const usersJson = await AsyncStorage.getItem('users');
      if (usersJson) {
        setUsers(JSON.parse(usersJson));
      }
    } catch (error) {
      console.error('Failed to load users.', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadUsers();
    }, [loadUsers])
  );

  const handleDelete = (userToDelete: User) => {
    Alert.alert(
      "Confirmar Exclusão",
      `Você tem certeza que deseja excluir o usuário ${userToDelete.name}?`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              const updatedUsers = users.filter(user => user.id !== userToDelete.id);
              setUsers(updatedUsers);
              await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
            } catch (error) {
              console.error('Failed to delete user.', error);
              Alert.alert('Erro', 'Não foi possível excluir o usuário.');
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.userContainer}>
      <TouchableOpacity
        style={styles.userInfoTouchable}
        onPress={() => navigation.navigate('AdicionaEditaUsuario', { user: item })}
      >
        <Image source={{ uri: item.avatar || 'https://via.placeholder.com/50' }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item)}
      >
        <Text style={styles.deleteButtonText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    list: {
      paddingHorizontal: 16,
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    userInfoTouchable: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 16,
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    userEmail: {
      fontSize: 14,
      color: '#666',
    },
    deleteButton: {
      padding: 10,
      marginLeft: 10,
    },
    deleteButtonText: {
      fontSize: 24,
    },
  });
  

export default ListaUsuarioScreen;