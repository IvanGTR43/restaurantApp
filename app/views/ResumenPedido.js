import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Text,
  FlatList,
  Image,
  Divider,
  Center,
  Heading,
  Box,
  HStack,
  Input,
  Stack,
  Button,
  Avatar,
  VStack,
} from 'native-base';
import {v4 as uuidv4} from 'uuid';

import {useNavigation} from '@react-navigation/native';

import PedidosContext from '../context/pedido/pedidosContext';
import FirebaseContext from '../context/firebase/firebaseContext';

import globalStyles from '../styles/global';

const ResumenPedido = () => {
  // context de pedido
  const {pedido, total, mostrarTotal, eliminarProducto, pedidoRealizado} =
    useContext(PedidosContext);
  const {firebase} = useContext(FirebaseContext);

  const navigation = useNavigation();

  useEffect(() => {
    calcularTotal();
  }, [pedido]);

  //calcular el total para enviarlo a pedidosState
  const calcularTotal = () => {
    let nuevoTotal = 0;
    nuevoTotal = pedido.reduce(
      (nuevoTotal, articulo) => nuevoTotal + articulo.total,
      0,
    );
    mostrarTotal(nuevoTotal);
  };

  // cconfirmacion de pedido
  const confirmarPedido = () => {
    Alert.alert(
      'Revisa tu pedido',
      'Una vez que el pedido sea realizado ya no podra canclearse',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            // crear el objeto completo del pedido
            const pedidoCompleto = {
              tiempoEntrega: 0,
              completado: false,
              total: Number(total),
              orden: pedido,
              creado: Date.now(),
            };
            // escribe en firebase el pedido
            const id = uuidv4().toString();
            firebase.database
              .ref(`pedidos/${id}`)
              .set(pedidoCompleto)
              .then(() => {
                pedidoRealizado(id);
                navigation.navigate('progreso-pedido');
              })
              .catch(err => {
                console.log(err);
              });
          },
        },
        ,
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
    );
  };
  return (
    <View style={globalStyles.contenedor}>
      <Center flex={1}>
        <Heading mt={8}>Resumen de Pedidos</Heading>
        <FlatList
          data={pedido}
          renderItem={({item, index}) => (
            <Platillo item={item} eliminarProducto={eliminarProducto} />
          )}
          keyExtractor={(item, index) => `${item.id}${index}`}
        />
        <Text style={globalStyles.cantidad} fontSize={24}>
          Total a Pagar: ${total}
        </Text>
        <HStack>
          <Button
            onPress={() => navigation.navigate('menu')}
            backgroundColor={'black'}
            width={'95%'}
            mt="30"
            _text={{
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}>
            Seguir Ordenando
          </Button>
        </HStack>
        <HStack alignItems="center" safeAreaBottom mt={12}>
          <Button
            style={globalStyles.boton}
            onPress={() => confirmarPedido()}
            width={'95%'}
            _text={{
              color: 'black',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}>
            Ordenar Pedido
          </Button>
        </HStack>
      </Center>
    </View>
  );
};

export default ResumenPedido;

function Platillo({item, eliminarProducto}) {
  const {nombre, imagen, cantidad, precio, id} = item;
  const confirmarEliminacion = id => {
    //Eliminar un Producto del arreglo de pedido
    Alert.alert('Eliminar Pedido?', 'Una vez eliminado no se podra recuperar', [
      {
        text: 'Confirmar',
        style: 'destructive',
        onPress: () => {
          eliminarProducto(id);
        },
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]);
  };
  return (
    <Box borderBottomWidth="1" borderColor="coolGray.200" pl="4" pr="5">
      <HStack alignItems="space-between">
        <Center h="20" w="20%">
          <Avatar source={{uri: imagen}} size="48px" />
        </Center>
        <Box h="20" w="60%">
          <Text>{nombre}</Text>
          <Text>Cantidad: {cantidad}</Text>
          <Text>Precio: {precio}</Text>
        </Box>
        <Box h="20" w="20%" justifyContent={'center'} alignItems={'center'}>
          <Icon
            name="delete"
            size={24}
            onPress={() => confirmarEliminacion(id)}
            color={'red'}
          />
        </Box>
      </HStack>
    </Box>
  );
}
