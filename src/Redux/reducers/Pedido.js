import {
  PEDIDO_BORRAR_PRODUCTO,
  PEDIDO_AGREGAR_PRODUCTO,
  PEDIDO_VACIAR,
} from 'Constantes';
import produce from 'immer';

const estado_inicial = {
  cargando: false,
  error: '',
  negocio: '',
  productos: [],
};

export default Pedido = (state = estado_inicial, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case PEDIDO_AGREGAR_PRODUCTO:
        let index = draft.productos.findIndex(
          (p) => p.id == action.producto.id,
        );
        if (index == -1) {
          draft.productos.push(action.producto);
        } else {
          draft.productos[index] = action.producto;
        }
        break;
      case PEDIDO_VACIAR:
        draft.negocio = '';
        draft.productos = [];
        break;
      case PEDIDO_BORRAR_PRODUCTO:
        var producto = draft.productos.findIndex(
          (p) => p.id == action.producto.id,
        );
        if (producto > -1) {
          console.log('ADENTROBORRAR', action.producto);
          draft.productos.splice(producto, 1);
        }
        break;
    }
  });
};
