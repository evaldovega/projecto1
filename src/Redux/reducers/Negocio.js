import {NEGOCIO_CARGANDO,NEGOCIO_CARGADO,NEGOCIO_ERROR_CARGANDO} from 'Constantes'
import produce from 'immer';

const estado_inicial={
    cargando:false,
    error:'',
    data:{}
}

export default Negocio = (state = estado_inicial, action) => {
    return produce(state, (draft) => {
        switch(action.type){
            case NEGOCIO_CARGANDO:
                draft.data=estado_inicial.data
                draft.cargando=true
                draft.error=''
            break
            case NEGOCIO_CARGADO:
                draft.data=action.data
                draft.data.negocio_id=action.negocio_id
                
                draft.cargando=false
            break
            case NEGOCIO_ERROR_CARGANDO:
                draft.cargando=false
                draft.error=action.error
            break
        }
    })
}