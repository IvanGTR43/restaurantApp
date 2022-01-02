import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
  },
  boton: {
    backgroundColor: '#ffda00',
  },
  txtBoton: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    justifyContent: 'center',
  },
  contenido: {
    marginHorizontal: '2.5%',
    flex: 1,
  },
  imagen: {
    height: 300,
    width: '100%',
  },
  cantidad: {
    marginHorizontal: 8,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
});

export default globalStyles;
