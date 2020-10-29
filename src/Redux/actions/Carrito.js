import {
    CARRITO_CARGANDO,
    CARRITO_CARGADO,
    CARRITO_BORRAR_PRODUCTO,
    CARRITO_SET_CANTIDAD_PRODUCTO,
    CARRITO_SET_INSTRUCCIONES_PRODUCTO
} from 'Constantes'

export const cargarCarrito=(negocio)=>{
    return async (dispatch)=>{
        console.log("Cargar carrito a ",negocio)
        dispatch({type:CARRITO_CARGANDO,negocio_id:negocio})
        global.BD.find({
            selector: {business_id: negocio}
        }).then(result=>{
            if(result.docs.length>0){
                const orden=result.docs[0]
                dispatch({type:CARRITO_CARGADO,productos:orden.products,orden_id:orden._id})
                console.log("Orden encontrada ",orden)
            }else{
                dispatch({type:CARRITO_CARGADO,productos:[],orden_id:''})
            }
        })
    }
}

export const ingresarInstrucciones=(producto,instrucciones)=>{
    const {id,name,price}=producto
    return (dispatch,getState)=>{
        global.BD.upsert(getState().Carrito.orden_id,(doc)=>{
            let index=doc.products.findIndex(p=>p.id==id)
            if(index>=0){
                doc.products[index].comment=instrucciones
            }else{
                doc.products.push({
                    id:id,
                    name:name,
                    comment:instrucciones,
                    quantity:1,
                    price:price,
                    options:[],
                    ingredients:[]
                })
            }
            return doc
        }).then(()=>{
            dispatch({type:CARRITO_SET_INSTRUCCIONES_PRODUCTO,producto:producto,instrucciones:instrucciones})
        })
    }
}

export const setCantidad=(producto,cantidad)=>{
    const {id,name,price}=producto
    return (dispatch,getState)=>{
        global.BD.upsert(getState().Carrito.orden_id,(doc)=>{
            let index=doc.products.findIndex(p=>p.id==id)
            if(index>=0){
                doc.products[index].quantity=cantidad
            }else{
                doc.products.push({
                    id:id,
                    name:name,
                    comment:'',
                    quantity:cantidad,
                    price:price,
                    options:[],
                    ingredients:[]
                })
            }
            return doc
        }).then(()=>{
            dispatch({type:CARRITO_SET_CANTIDAD_PRODUCTO,producto:producto,cantidad:cantidad})
        })
    }
}

export const borrarProducto=(producto_id)=>{
    return async (dispatch,getState)=>{
        console.log("Borrar producto ",producto_id," en la orden ",getState().Carrito.orden_id)
        global.BD.upsert(getState().Carrito.orden_id,(doc)=>{
            console.log(doc)
            let index=doc.products.findIndex(p=>p.id==producto_id)
            if(index>=0){
                doc.products.splice(index,1)
            }
            return doc
        }).then(()=>{
            dispatch({type:CARRITO_BORRAR_PRODUCTO,producto_id:producto_id})
        })
    }
}