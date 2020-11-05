import {
    ACTION_USUARIO_ACCEDIENDO,
    ACTION_USUARIO_ACCESO_CORRECTO,
    ACTION_USUARIO_ERROR_ACCEDIENDO,
    ACTION_USUARIO_PUSH
} from 'Constantes'

import produce from 'immer';
const estado_inicial={
        "id": null,
        "push":"",
        "name": null,
        "lastname": null,
        "email": null,
        "login_type": null,
        "social_id": null,
        "photo": null,
        "birthdate": null,
        "phone": null,
        "cellphone": null,
        "city_id": null,
        "dropdown_option_id": null,
        "address": null,
        "address_notes": null,
        "zipcode": null,
        "location": null,
        "level": null,
        "language_id": null,
        "push_notifications": true,
        "busy": false,
        "available": false,
        "enabled": true,
        "created_at": null,
        "updated_at": null,
        "deleted_at": null,
        "internal_number": null,
        "map_data": null,
        "middle_name": null,
        "second_lastname": null,
        "country_phone_code": null,
        "token":null,
        accediendo:false,
        error:''
}

export default Usuario = (state = estado_inicial, action) => {
    return produce(state, (draft) => {
        switch(action.type){
            case ACTION_USUARIO_ACCEDIENDO:
                draft.accediendo       = true
                draft.error =   ''
            break
            case ACTION_USUARIO_PUSH:
                draft.push=action.push
            break
            case ACTION_USUARIO_ACCESO_CORRECTO:
                draft.accediendo    = false
                Object.keys(action.data).forEach((k)=>{
                    draft[k]=action.data[k]
                })
                console.log(draft.id)
            break
            case ACTION_USUARIO_ERROR_ACCEDIENDO:
                draft.accediendo=false
                draft.error=action.error
            break
        }
    })
}