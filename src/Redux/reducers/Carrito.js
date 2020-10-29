import {CARRITO_CARGANDO,CARRITO_CARGADO,CARRITO_BORRAR_PRODUCTO,CARRITO_SET_CANTIDAD_PRODUCTO,CARRITO_SET_INSTRUCCIONES_PRODUCTO} from 'Constantes'

import produce from 'immer';

const estado_inicial={
    cargando:false,
    carrito_cargado:false,
    error:'',
    negocio_id:'',
    orden_id:'',
    productos:[]
}


export default Carrito = (state = estado_inicial, action) => {
    return produce(state, (draft) => {
        switch(action.type){
            case CARRITO_CARGANDO:
                draft.cargando=true
                draft.negocio_id=action.negocio_id
                draft.carrito_cargado=false
            break
            case CARRITO_CARGADO:
                draft.cargando=false
                draft.productos=action.productos
                draft.orden_id=action.orden_id
                draft.carrito_cargado=true
            break
            case CARRITO_BORRAR_PRODUCTO:
                let index=draft.productos.findIndex(p=>p.id==action.producto_id)
                if(index>=0){
                    draft.productos.splice(index,1)
                }
            break
            case CARRITO_SET_CANTIDAD_PRODUCTO:
                var {id,name,price}=action.producto
                let index_s=draft.productos.findIndex(p=>p.id==id)
                console.log("INC ",index_s)
                if(index_s>=0){
                    draft.productos[index_s].quantity=action.cantidad
                }else{
                    draft.productos.push({
                        id:id,
                        name:name,
                        comment:'',
                        quantity:action.cantidad,
                        price:price,
                        options:[],
                        ingredients:[]
                    })
                }
            break
            case CARRITO_SET_INSTRUCCIONES_PRODUCTO:
                var {id,name,price}=action.producto
                let index_i=draft.productos.findIndex(p=>p.id==id)
                if(index_i>=0){
                    console.log("Instrucciones ",action.instrucciones)
                    draft.productos[index_i].comment=action.instrucciones
                }else{
                    draft.productos.push({
                        id:id,
                        name:name,
                        comment:action.instrucciones,
                        quantity:1,
                        price:price,
                        options:[],
                        ingredients:[]
                    })
                }
            break
        }
    })
}


