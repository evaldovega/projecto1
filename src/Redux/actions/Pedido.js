import {PEDIDO_BORRAR_PRODUCTO,PEDIDO_AGREGAR_PRODUCTO,PEDIDO_VACIAR} from 'Constantes'

export const agregarProducto=(producto)=>{
    return (dispatch)=>{
        dispatch({type:PEDIDO_AGREGAR_PRODUCTO,producto:producto})
    }
}
export const borrarProducto=(producto)=>{
    return (dispatch)=>{
        dispatch({type:PEDIDO_BORRAR_PRODUCTO,producto:producto})
    }
}

export const vaciar=()=>{
    return (dispatch)=>{
        dispatch({type:PEDIDO_VACIAR})
    }
}