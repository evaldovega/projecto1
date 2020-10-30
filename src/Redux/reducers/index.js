import {combineReducers} from 'redux';
import Usuario from './Usuario';
import Negocio from './Negocio'
import Pedido from './Pedido'


export default combineReducers({
  Usuario: Usuario,
  Negocio:Negocio,
  Pedido:Pedido
});