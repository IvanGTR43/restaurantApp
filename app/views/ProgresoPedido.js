import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Box, Center, Heading} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import CountDown from 'react-countdown';

import globalStyles from '../styles/global';

import PedidosContext from '../context/pedido/pedidosContext';
import FirebaseContext from '../context/firebase/firebaseContext';

const ProgresoPedido = () => {
  const {idPedido} = useContext(PedidosContext);
  const {firebase} = useContext(FirebaseContext);
  const navigation = useNavigation();
  const [tiempo, setTiempo] = useState(0);
  const [completado, setCompletado] = useState(false);
  useEffect(() => {
    firebase.database.ref(`pedidos/${idPedido}`).on('value', snapshot => {
      console.log(snapshot.val());
      setTiempo(snapshot.val().tiempoEntrega);
      setCompletado(snapshot.val().completado);
    });
  }, []);
  const renderer = ({minutes, seconds}) => {
    return <Text style={styles.tiempo}>{`${minutes} : ${seconds}`}</Text>;
  };
  return (
    <View style={globalStyles.contenedor}>
      <Center flex={1}>
        {tiempo === 0 && (
          <>
            <Text textAlign="center">Hemos Recibido tu Orden</Text>
            <Text textAlign="center">
              Estamos Calculando el Tiempo de Entrega
            </Text>
          </>
        )}
        {!completado && tiempo > 0 && (
          <>
            <Text>Su orden estara lista en </Text>
            <Text>
              <CountDown
                date={Date.now() + tiempo * 60000}
                renderer={renderer}
              />
            </Text>
          </>
        )}
        {completado && (
          <>
            <Heading style={styles.txtCompletado}>Orden Lista</Heading>
            <Text style={styles.txtCompletado}>
              Por Favor pase a recoger su Pedido
            </Text>

            <Button
              width="95%"
              onPress={() => navigation.navigate('nueva-orden')}>
              Comenzar Una Orden Nueva
            </Button>
          </>
        )}
      </Center>
    </View>
  );
};

export default ProgresoPedido;

const styles = StyleSheet.create({
  tiempo: {
    marginBottom: 20,
    fontSize: 60,
    textAlign: 'center',
    marginTop: 30,
  },
  txtCompletado: {
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
});
