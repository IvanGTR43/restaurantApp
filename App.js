import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeBaseProvider} from 'native-base';

import Menu from './app/views/Menu';
import FormularioPlatillo from './app/views/FormularioPlatillo';
import NuevaOrden from './app/views/NuevaOrden';
import ProgresoPedido from './app/views/ProgresoPedido';
import ResumenPedido from './app/views/ResumenPedido';
import DetallePlatillo from './app/views/DetallePlatillo';
import BotonResumen from './app/components/BotonResumen';

import FirebaseState from './app/context/firebase/firebaseState';
import PedidosState from './app/context/pedido/pedidosState';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <FirebaseState>
        <PedidosState>
          <NativeBaseProvider>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerStyle: {backgroundColor: '#ffda00'},
                  headerTitleStyle: {fontWeight: 'bold'},
                  headerTintColor: '#000',
                }}>
                <Stack.Screen
                  name="nueva-orden"
                  component={NuevaOrden}
                  options={{title: 'Nueva Orden'}}
                />
                <Stack.Screen
                  name="menu"
                  component={Menu}
                  options={{
                    title: 'Menu',
                    headerRight: props => <BotonResumen />,
                  }}
                />
                <Stack.Screen
                  name="detalle-platillo"
                  component={DetallePlatillo}
                  options={{title: 'Detalles del Platillo'}}
                />
                <Stack.Screen
                  name="formulario-platillo"
                  component={FormularioPlatillo}
                  options={{title: 'Ordenar Platillo'}}
                />
                <Stack.Screen
                  name="resumen-pedido"
                  component={ResumenPedido}
                  options={{title: 'Resumen'}}
                />
                <Stack.Screen
                  name="progreso-pedido"
                  component={ProgresoPedido}
                  options={{title: 'Progreso del Pedido'}}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </NativeBaseProvider>
        </PedidosState>
      </FirebaseState>
    </>
  );
};

export default App;
