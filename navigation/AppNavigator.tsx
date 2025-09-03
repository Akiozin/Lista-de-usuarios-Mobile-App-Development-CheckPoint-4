import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import ListaUsuarioScreen from '../screens/ListaUsuario';
import AdicionaEditaUsuarioScreen from '../screens/AdicionaEditaUsuario';
import { User } from '../types';

export type RootStackParamList = {
  ListaUsuario: undefined;
  AdicionaEditaUsuario: { user?: User };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ListaUsuario"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ed145b',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="ListaUsuario"
          component={ListaUsuarioScreen}
          options={({ navigation }) => ({
            title: 'Lista de Usuários',
            headerRight: () => (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AdicionaEditaUsuario', {})}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="AdicionaEditaUsuario"
          component={AdicionaEditaUsuarioScreen}
          options={({ route }) => ({
            title: route.params?.user ? 'Editar Usuário' : 'Formulário de Usuário',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  addButton: {
    marginRight: 15,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default AppNavigator;