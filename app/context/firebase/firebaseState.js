import React, {useReducer} from 'react';
import lodash from 'lodash';

import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';
import firebase from '../../firebase/index';

import {OBTENER_PRODUCTOS} from '../../types';

const FirebaseState = props => {
  // crear state Inicial
  const initialState = {
    menu: [],
    error: false,
    pedidos: [],
  };

  // useReducer cons dispatch para ejecutar las funciones
  const [state, dispatch] = useReducer(FirebaseReducer, initialState);

  // funcion que se ejecuta para traer los produyctos
  const obtenerProductos = () => {
    // consultar firebase
    let platillos = [];
    firebase.database.ref('productos').on('value', snapshot => {
      Object.entries(snapshot.val()).map(([key, platillo]) => {
        const {existencia} = platillo;
        if (existencia) {
          const platilloEnExtstencia = {
            ...platillo,
            id: key,
          };
          platillos.push(platilloEnExtstencia);
        }
      });
    });
    platillos = lodash.sortBy(platillos, 'categoria');
    dispatch({
      type: OBTENER_PRODUCTOS,
      payload: platillos,
    });
  };

  return (
    <FirebaseContext.Provider
      value={{
        menu: state.menu,
        firebase,
        obtenerProductos,
      }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseState;
