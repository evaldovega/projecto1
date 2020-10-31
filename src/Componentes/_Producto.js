import {COLOR_PRIMARY} from 'Constantes';
import React from 'react';
import {
  Image,
  View,
  ScrollView,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import {ListItem, CheckBox, Input, Button, Text} from 'react-native-elements';
import NotificationPopup from 'react-native-push-notification-popup';
import Icon from 'react-native-vector-icons/FontAwesome';
import CurrencyFormat from 'react-currency-format';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {
  cargarCarrito,
  setCantidad,
  borrarProducto,
  ingresarInstrucciones,
} from 'Redux/actions/Carrito';

const icono = require('imagenes/logo.png');

const renderCustomPopup = ({
  appIconSource,
  appTitle,
  timeText,
  title,
  body,
}) => (
  <View>
    <Text>{title}</Text>
    <Text>{body}</Text>
    <Button
      title="My button"
      onPress={() => console.log('Popup button onPress!')}
    />
  </View>
);

class Producto extends React.Component {
  state = {
    opacidad: 0,
    orden_id: '',
    data: {
      id: '',
      comment: '',
      quantity: '0',
      price: 0,
      options: [],
      ingredients: [],
    },
  };

  crearOrden = () => {
    let orden = {
      business_id: this.props.data.negocio_id,
      paymethod_id: '',
      delivery_datetime: '',
      delivery_type: '',
      location: {},
      products: [],
      customer: {},
    };
    return global.BD.post(orden).then((e) => {
      console.log(e);
      orden._id = e._id;
      this.setState({orden_id: e._id});
    });
  };

  buscarOrden = () => {
    global.BD.find({
      selector: {business_id: this.props.data.negocio_id},
    })
      .then((result) => {
        if (result.docs.length > 0) {
          const orden = result.docs[0];
          this.setState({orden_id: orden._id});
          console.log('Orden encontrada ', orden);
          const p = orden.products.find(
            (p) => p.id == this.props.route.params.producto.id,
          );
          if (p) {
            console.log('El producto esta agregado en la orden');
            this.setState({data: p});
          }
        }
      })
      .catch((error) => {});
  };

  actualizarOrden = async () => {
    if (this.state.data.quantity == '0') {
      return;
    }
    if (this.state.orden_id == '') {
      await this.crearOrden();
    }
    global.BD.upsert(this.state.orden_id, (doc) => {
      let index = doc.products.findIndex((p) => p.id == this.state.data.id);
      if (index < 0) {
        doc.products.push(this.state.data);
      } else {
        if (this.state.data.quantity == 0) {
          console.log('Borrar producto de orden');
          doc.products.splice(index, 1);
        } else {
          doc.products[index] = this.state.data;
        }
      }
      return doc;
    });
  };

  componentDidMount() {
    console.log('Negocio id ', this.props.data.negocio_id);
    this.setState((state) => {
      let data = state.data;
      data.id = this.props.route.params.producto.id;
      data.price = this.props.route.params.producto.price;
      return {...data};
    });
    this.props.cargarCarrito(this.props.data.negocio_id);
    //this.buscarOrden()
  }

  componentDidUpdate(prev) {
    if (!prev.carrito_cargado && this.props.carrito_cargado) {
    }
  }

  subOpcionAgregada = (opcion_id, subopcion_id) => {
    let opcion = this.state.data.options.find((o) => o.id == opcion_id);
    if (opcion) {
      let sub = opcion.suboptions.find((e) => e == subopcion_id);
      if (sub) {
        return true;
      }
    }
    return false;
  };

  seleccionarOpcion = (n, min, max, opcion_id, subopcion_id) => {
    this.setState((state) => {
      let data = state.data;
      let options = data.options;
      let index = options.findIndex((o) => o.id == opcion_id);
      if (index >= 0) {
        let subopcion = options[index].suboptions.findIndex(
          (s) => s == subopcion_id,
        );

        if (subopcion >= 0) {
          options[index].suboptions.splice(subopcion, 1);
        } else {
          if (options[index].suboptions.length == max) {
            this.popup.show({
              appIconSource: icono,
              appTitle: 'SenderAPP',
              timeText: '',
              title: 'Lo siento',
              body: 'No puedes agregar mas opciones a ' + n + ' 😬',
              slideOutTime: 5000,
            });
            return;
          }
          state.data.options[index].suboptions.push(subopcion_id);
        }
      } else {
        state.data.options.push({id: opcion_id, suboptions: [subopcion_id]});
      }

      return {...state};
    });
  };

  agregarIngrediente = (ingrediente) => {
    this.setState((state) => {
      let data = state.data;
      let ingredients = data.ingredients;
      let i = ingredients.findIndex((ig) => ig == ingrediente);
      if (i >= 0) {
        ingredients.splice(i, 1);
      } else {
        ingredients.push(ingrediente);
      }
      data = {...ingredients};

      this.actualizarOrden();

      return {...{...data}};
    });
  };

  renderExtras = (extras) => {
    return extras.map((e) => {
      return (
        <>
          {e.options.map((o) => {
            return (
              <View>
                <Text h5>
                  {o.name} (Min. {o.min} Max. {o.max})
                </Text>
                {o.suboptions.map((_o) => (
                  <CheckBox
                    checked={this.subOpcionAgregada(o.id, _o.id)}
                    onPress={() =>
                      this.seleccionarOpcion(o.name, o.min, o.max, o.id, _o.id)
                    }
                    style={{flex: 1}}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    title={_o.name}
                  />
                ))}
              </View>
            );
          })}
        </>
      );
    });
  };

  ingredienteAgregado = (id) => {
    const producto = this.props.productos.find(
      (p) => p.id == this.props.route.params.producto.id,
    );
    if (producto) {
      return producto.ingredients.includes(id);
    }
    return false;
  };

  renderIngredientes = (ingredientes) => {
    //this.state.data.ingredients.includes(i.id)
    const _ingredientes = ingredientes.map((i) => {
      return (
        <CheckBox
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          title={i.name}
          checked={this.ingredienteAgregado(i.id)}
          onPress={() => this.agregarIngrediente(i.id)}
        />
      );
    });
    return (
      <View>
        <Text h5>Ingredientes</Text>
        {_ingredientes}
      </View>
    );
  };

  plus = () => {
    const cantidad = parseInt(this.cantidad()) + 1;
    this.props.setCantidad(this.props.route.params.producto, cantidad);
  };

  minus = () => {
    const cantidad = parseInt(this.cantidad()) - 1;
    if (cantidad > 0) {
      this.props.setCantidad(this.props.route.params.producto, cantidad);
    } else {
      this.props.borrarProducto(this.props.route.params.producto.id);
    }
  };

  total = () => {
    return this.state.data.price * this.state.data.quantity;
  };

  cantidad = () => {
    const producto = this.props.productos.find(
      (p) => p.id == this.props.route.params.producto.id,
    );
    if (producto) {
      return producto.quantity;
    }
    return 0;
  };
  instrucciones = () => {
    const producto = this.props.productos.find(
      (p) => p.id == this.props.route.params.producto.id,
    );
    if (producto) {
      return producto.comment;
    }
    return '';
  };

  final = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 0;
    const t = 200 - contentOffset.y;
    const p = 1 - (t * 100) / 200 / 100;
    this.setState({opacidad: p});
  };

  render() {
    const add = () => (
      <Button
        title="+"
        icon={<Icon name="plus" size={15} color={COLOR_PRIMARY} />}
      />
    );

    const {
      images,
      name,
      extras,
      ingredients,
    } = this.props.route.params.producto;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{flex: 1, backgroundColor: '#ffff'}}>
        <View style={{position: 'absolute', height: 200, width: '100%'}}>
          <Image
            style={{width: '100%', height: undefined, aspectRatio: 16 / 9}}
            source={{uri: images}}
          />
          <View
            style={{
              width: '100%',
              height: 200,
              backgroundColor: '#000',
              position: 'absolute',
              opacity: this.state.opacidad,
            }}></View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={({nativeEvent}) => {
            this.final(nativeEvent);
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#ffff',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              padding: 16,
              marginTop: 200,
              elevation: 3,
            }}>
            <Text h3 style={{color: COLOR_PRIMARY}}>
              {name}
            </Text>
            {this.renderIngredientes(ingredients)}
            {this.renderExtras(extras)}
            <Text>Instrucciones Especiales</Text>
            <TextInput
              multiline={true}
              value={this.instrucciones()}
              onChangeText={(t) =>
                this.props.ingresarInstrucciones(
                  this.props.route.params.producto,
                  t,
                )
              }
              numberOfLines={4}
              underlineColorAndroid="#ffff"
              style={{borderColor: 'silver', borderWidth: 1, borderRadius: 16}}
            />
          </View>
        </ScrollView>

        <LinearGradient
          colors={['#fff', '#BFC9CA']}
          style={{
            height: 100,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Button
              icon={<Icon name="minus" color="#ffff" size={24} />}
              onPress={this.minus}
              buttonStyle={{
                borderRadius: 32,
                backgroundColor: COLOR_PRIMARY,
              }}></Button>
            <Text h4 style={{marginHorizontal: 16}}>
              {this.cantidad()}
            </Text>
            <Button
              icon={<Icon name="plus" color="#ffff" size={24} />}
              backgroundColor={COLOR_PRIMARY}
              onPress={this.plus}
              buttonStyle={{
                borderRadius: 32,
                backgroundColor: COLOR_PRIMARY,
              }}></Button>
          </View>
          <CurrencyFormat
            value={this.total()}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
            renderText={(value) => <Text h5>{value}</Text>}
          />

          <Button
            buttonStyle={{
              backgroundColor: COLOR_PRIMARY,
              borderRadius: 32,
              paddingHorizontal: 16,
            }}
            icon={<Icon name="cart-plus" size={24} color="#ffff" />}
            title=" Añadir"
          />
        </LinearGradient>

        <NotificationPopup
          shouldChildHandleResponderStart={true}
          shouldChildHandleResponderMove={true}
          ref={(ref) => (this.popup = ref)}
        />
      </KeyboardAvoidingView>
    );
  }
}

const mapearEstado = (state) => {
  return {
    data: state.Negocio.data,
    productos: state.Carrito.productos,
    carrito_cargado: state.Carrito.carrito_cargado,
  };
};
const mapearAcciones = (dispatch) => {
  return {
    cargarCarrito: (negocio) => {
      dispatch(cargarCarrito(negocio));
    },
    setCantidad: (producto, cantidad) => {
      dispatch(setCantidad(producto, cantidad));
    },
    borrarProducto: (producto_id) => {
      dispatch(borrarProducto(producto_id));
    },
    ingresarInstrucciones: (producto, instrucciones) => {
      dispatch(ingresarInstrucciones(producto, instrucciones));
    },
  };
};
export default connect(mapearEstado, mapearAcciones)(Producto);
