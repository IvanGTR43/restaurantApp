import React, {useContext, useEffect, useState, Fragment} from 'react';
import {StyleSheet, View, TouchableHighlight} from 'react-native';
import {
  Container,
  FlatList,
  Box,
  Avatar,
  HStack,
  Text,
  Pressable,
  VStack,
  Spacer,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import FirebaseContext from '../context/firebase/firebaseContext';
import PedidosContext from '../context/pedido/pedidosContext';

import globalStyles from '../styles/global';
const Menu = () => {
  // context de firebase
  const {menu} = useContext(FirebaseContext);
  // context de Pedidos
  const {seleccionarPlatillo} = useContext(PedidosContext);

  // hook para redireccionar
  const navigation = useNavigation();

  const [platillos, setplatillos] = useState([]);

  useEffect(() => {
    setplatillos(menu);
    //console.log(menu);
  }, []);

  if (platillos.length === 0) {
    return null;
  }
  return (
    <Box style={globalStyles.contenedor}>
      <View style={{backgroundColor: '#fff', width: '100%'}}>
        <FlatList
          keyExtractor={item => item.id}
          data={platillos}
          to
          renderItem={({item, index}) => {
            const {imagen, nombre, descripcion, categoria, precio} = item;

            return (
              <Pressable
                onPress={() => {
                  seleccionarPlatillo(item);
                  navigation.navigate('detalle-platillo');
                }}>
                {({isPressed}) => (
                  <Box
                    flexDirection="column"
                    flex="1"
                    borderBottomWidth="1"
                    borderColor="coolGray.200"
                    right={0}
                    pl="4"
                    pr="5"
                    py="2"
                    style={{
                      transform: [
                        {
                          scale: isPressed ? 0.9 : 1,
                        },
                      ],
                    }}>
                    <HStack>
                      <Avatar
                        source={{uri: imagen}}
                        size="48px"
                        large
                        mr="16px"
                      />

                      <VStack>
                        <Text bold>{nombre}</Text>
                        <Text color="coolGray.800" numberOfLines={2} note>
                          {descripcion}
                        </Text>
                      </VStack>
                      <Spacer />
                      <Text alignSelf="flex-start">$ {precio}</Text>
                    </HStack>
                  </Box>
                )}
              </Pressable>
            );
          }}
        />
      </View>
    </Box>
  );
};

export default Menu;
