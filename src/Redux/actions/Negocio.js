import {NEGOCIO_CARGANDO,NEGOCIO_CARGADO,NEGOCIO_ERROR_CARGANDO} from 'Constantes'

export const Cargar=(id)=>{
    return async (dispatch)=>{
        console.log("Cargando Negocio ",id)
        dispatch({type:NEGOCIO_CARGANDO})
        let req=await global.ordering.businesses(id).get()
        console.log(req)
        if(req.response.data.error){
            dispatch({type:NEGOCIO_ERROR_CARGANDO,error:req.response.data.result})
        }else{
            let data=req.response.data.result
            data.categories.map(c=>{
                c.products.map(p=>{
                    p.en_cesta=0
                    return p
                })
                return c
            })
            dispatch({type:NEGOCIO_CARGADO,data:data})
        }
    }
}