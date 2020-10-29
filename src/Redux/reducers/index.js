import {combineReducers} from 'redux';
import Usuario from './Usuario';
import Negocio from './Negocio'
import Carrito from './Carrito'

export default combineReducers({
  Usuario: Usuario,
  Negocio:Negocio,
  Carrito:Carrito
});