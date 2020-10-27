import {ACTION_USUARIO_ACCESO_CORRECTO} from 'Constantes'

export const SET=(data)=>{
    return (dispatch)=>{
        dispatch({type:ACTION_USUARIO_ACCESO_CORRECTO,data:data})
    }
}