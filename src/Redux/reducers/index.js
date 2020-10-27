import {combineReducers} from 'redux';
import Usuario from './Usuario';
import Negocio from './Negocio'
export default combineReducers({
  Usuario: Usuario,
  Negocio:Negocio
});