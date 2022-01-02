import React, {useReducer} from 'react';

import PedidosReducer from './pedidosReducer';
import PedidosContext from './pedidosContext';
import {
  SELECCIONAR_PRODUCTO,
  CONFIRMAR_ORDENAR_PLATILLO,
  MOSTRAR_RESUMEN,
  ELIMINAR_PROCUTO,
  PEDIDO_ORDENADO,
} from '../../types';

import firebase from '../../firebase';

const PedidosState = props => {
  // crear state Inicial
  const initialState = {
    pedido: [],
    platillo: null,
    total: 0,
    idPedido: '',
  };

  // useReducer cons dispatch para ejecutar las funciones
  const [state, dispatch] = useReducer(PedidosReducer, initialState);
  // selecciona el product0 que el usuario desea ordenar
  const seleccionarPlatillo = platillo => {
    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: platillo,
    });
  };

  // confirmacion del usuario para guardarPedido

  const guardarPedido = pedido => {
    dispatch({
      type: CONFIRMAR_ORDENAR_PLATILLO,
      payload: pedido,
    });
  };

  // mostrar el total a apagar
  const mostrarTotal = total => {
    dispatch({
      type: MOSTRAR_RESUMEN,
      payload: total,
    });
  };
  // elimina un articulo del pedido
  const eliminarProducto = id => {
    dispatch({
      type: ELIMINAR_PROCUTO,
      payload: id,
    });
  };
  const pedidoRealizado = id => {
    dispatch({
      type: PEDIDO_ORDENADO,
      payload: id,
    });
  };
  return (
    <PedidosContext.Provider
      value={{
        pedido: state.pedido,
        platillo: state.platillo,
        total: state.total,
        idPedido: state.idPedido,
        seleccionarPlatillo,
        guardarPedido,
        mostrarTotal,
        eliminarProducto,
        pedidoRealizado,
      }}>
      {props.children}
    </PedidosContext.Provider>
  );
};

export default PedidosState;
