import React, {useEffect, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Text,
  VStack,
  Image,
  Button,
  Divider,
  Center,
  Heading,
  Box,
  HStack,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import PedidosContext from '../context/pedido/pedidosContext';

import globalStyles from '../styles/global';

const DetallePlatillo = () => {
  const {platillo} = useContext(PedidosContext);
  const {nombre, descripcion, precio, imagen, categoria} = platillo;

  const navigation = useNavigation();
  return (
    <View style={[globalStyles.contenedor, {width: '100%'}]}>
      <Center style={globalStyles.contenido}>
        <Heading mt={20} mb={20} fontSize={30}>
          {nombre}
        </Heading>
        <Box border="1" borderRadius="md">
          <VStack space="4" divider={<Divider />}>
            <Box px="4">
              <Image
                source={{uri: imagen}}
                size="2xl"
                alt="imagen del platillo"
              />
            </Box>
            <Box px="4" pb="4">
              <Text textAlign={'center'}>{descripcion}</Text>
              <Text style={globalStyles.cantidad} marginY={4} fontSize={24}>
                Precio: ${precio}
              </Text>
            </Box>
          </VStack>
        </Box>
      </Center>
      <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={6}>
        <Button
          width={'100%'}
          style={globalStyles.boton}
          onPress={() => navigation.navigate('formulario-platillo')}>
          <Text style={globalStyles.txtBoton}>Ordenar</Text>
        </Button>
      </HStack>
    </View>
  );
};

export default DetallePlatillo;
const styles = StyleSheet.create({});
