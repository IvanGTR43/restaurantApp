import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {
  Text,
  VStack,
  Image,
  IconButton,
  Divider,
  Center,
  Heading,
  Box,
  HStack,
  Input,
  Grid,
  Stack,
  Button,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import PedidosContext from '../context/pedido/pedidosContext';

import globalStyles from '../styles/global';

const FormularioPlatillo = () => {
  // context
  const {platillo, guardarPedido} = useContext(PedidosContext);
  const {nombre, descripcion, precio, imagen, categoria} = platillo;

  // cantidad de pedidos
  const [cantidad, setCantidad] = useState(1);
  // precio total de la orden
  const [total, setTotal] = useState(0);
  // naviegacion
  const navigation = useNavigation();
  useEffect(() => {
    calcularTotal();
  }, [cantidad]);
  // decremento de cantidad
  const decrementarUno = () => {
    if (cantidad > 1) {
      setCantidad(parseInt(cantidad) - 1);
    }
  };

  const calcularTotal = () => {
    setTotal(parseInt(precio) * cantidad);
  };
  // cambio de texto de cantidd
  const calcularCantidad = cantidad => {
    console.log(cantidad);
  };

  // confirmar la orden
  const confirmarOrden = () => {
    Alert.alert(
      'Desaes Confirmar tu Pedido?',
      'Un pedido confirmdo ya no se podra modificar',
      [
        {
          text: 'COnfirmar',
          style: 'default',
          onPress: () => {
            // alamacenar el pedido proncipal
            const pedido = {
              ...platillo,
              cantidad,
              total,
            };
            guardarPedido(pedido);
            // navegar hacia el resumen
            navigation.navigate('resumen-pedido');
          },
        },
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
        <Heading mb={16} mt={8} textAlign={'center'}>
          Cantidad
        </Heading>
        <Box width="100%">
          <VStack w="100%">
            <HStack justifyContent="center">
              <Center>
                <Button
                  variant={'solid'}
                  bgColor="black"
                  style={{height: 80, justifyContent: 'center'}}
                  w="40"
                  onPress={decrementarUno}>
                  <Icon name="remove" size={26} color={'white'} />
                </Button>
              </Center>
              <Center>
                <Input
                  keyboardType="number-pad"
                  style={{height: 80, justifyContent: 'center'}}
                  w="20"
                  fontSize={24}
                  textAlign={'center'}
                  value={cantidad.toString()}
                  onChangeText={cantidad => calcularCantidad(cantidad)}
                  ty
                />
              </Center>
              <Center>
                <Button
                  bgColor={'black'}
                  variant={'solid'}
                  style={{height: 80, justifyContent: 'center'}}
                  w="40"
                  onPress={() => setCantidad(parseInt(cantidad) + 1)}>
                  <Icon name="add" size={26} color={'white'} />
                </Button>
              </Center>
            </HStack>
            <Text style={globalStyles.cantidad} mt={8} fontSize={24}>
              SubTotal: ${total}
            </Text>
          </VStack>
        </Box>
      </Center>
      <HStack safeAreaBottom shadow={6} bottom={0}>
        <Button
          width={'100%'}
          style={globalStyles.boton}
          onPress={confirmarOrden}
          _text={{
            color: 'black',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}>
          Ordenar
        </Button>
      </HStack>
    </View>
  );
};

export default FormularioPlatillo;

const styles = StyleSheet.create({});
