import React, {useContext} from 'react';
import {Button, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import PedidosContext from '../context/pedido/pedidosContext';

import globalStyles from '../styles/global';
const BotonResumen = () => {
  const navigation = useNavigation();

  const {pedido} = useContext(PedidosContext);

  if (pedido.length === 0) {
    return null;
  }
  return (
    <Button
      onPress={() => navigation.navigate('resumen-pedido')}
      style={globalStyles.boton}>
      <Text style={globalStyles.txtBoton}>Pedido</Text>
    </Button>
  );
};

export default BotonResumen;
