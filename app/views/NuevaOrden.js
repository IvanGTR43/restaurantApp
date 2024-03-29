import React, {useEffect, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Box, Button, Text, Center, HStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import FirebaseContext from '../context/firebase/firebaseContext';

import globalStyles from '../styles/global';

const NuevaOrden = () => {
  const navigation = useNavigation();
  const {obtenerProductos} = useContext(FirebaseContext);

  useEffect(() => {
    obtenerProductos();
  }, []);
  return (
    <Center flex={1}>
      <Button
        width={'90%'}
        style={globalStyles.boton}
        onPress={() => navigation.navigate('menu')}
        _text={{
          color: 'black',
          fontWeight: 'bold',
          textTransform: 'uppercase',
        }}>
        Nueva Orden
      </Button>
    </Center>
  );
};

export default NuevaOrden;

const styles = StyleSheet.create({
  contenidoLocal: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
