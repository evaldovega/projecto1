import {ACTION_USUARIO_ACCESO_CORRECTO, ACTION_USUARIO_PUSH} from 'Constantes';

export const SET = (data) => {
  return (dispatch) => {
    console.log(data);
    dispatch({type: ACTION_USUARIO_ACCESO_CORRECTO, data: data});
  };
};
export const SET_PUSH = (push) => {
  return async (dispatch) => {
    dispatch({type: ACTION_USUARIO_PUSH, push: push});
  };
};
