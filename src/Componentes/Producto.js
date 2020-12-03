import {COLOR_PRIMARY, COLOR_BG} from 'Constantes';
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
import {
  ListItem,
  CheckBox,
  Input,
  Button,
  Text,
  Icon,
} from 'react-native-elements';
import NotificationPopup from 'react-native-push-notification-popup';
import CurrencyFormat from 'react-currency-format';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {agregarProducto} from 'Redux/actions/Pedido';
import _ from 'lodash';

const icono = require('imagenes/logo.png');
const TIMEOUT_UPDATE_LOCAL = 200;

class Producto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacidad: 0,
      orden_id: '',
      ingredients: [],
      extras: [],
      data: {
        id: '',
        name: '',
        comment: '',
        quantity: '0',
        price: 0,
        options: [],
        ingredients: [],
      },
    };
  }

  componentDidMount() {
    this.setState((state) => {
      const producto = this.props.data.categories
        .find((c) => c.id == this.props.route.params.categoria)
        .products.find((p) => p.id == this.props.route.params.id);
      //state.negocio_id=this.props.route.params.negocio_id
      state.id = this.props.route.params.id;
      state.name = producto.name;
      state.price = producto.price;
      state.images = producto.images;
      state.descripcion = producto.descripcion;
      state.ingredients = producto.ingredients;
      state.extras = producto.extras;

      state.data = {
        id: producto.id,
        categoria: this.props.route.params.categoria,
        name: producto.name,
        price: producto.price,
        images: producto.images,
        quantity: 1,
        options: [],
        ingredients: [],
      };

      return {...state};
    });

    setTimeout(() => {
      let producto = this.props.productos.find(
        (p) => p.id == this.state.data.id,
      );
      if (producto) {
        console.log('Rellenar producto ', producto);
        let _producto = _.cloneDeep(producto);
        this.setState((state) => {
          state.data = {..._producto};
          return {...state};
        });
      }
    });
  }

  componentDidUpdate(prev) {}

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
      console.log(state.data.options);
      let index = state.data.options.findIndex((o) => o.id == opcion_id);
      if (index >= 0) {
        let subopcion = state.data.options[index].suboptions.findIndex(
          (s) => s == subopcion_id,
        );
        if (subopcion >= 0) {
          state.data.options[index].suboptions.splice(subopcion, 1);
        } else {
          if (state.data.options[index].suboptions.length == max) {
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

  //--------------------Ingredientes
  ingredienteAgregado = (id) => {
    if (this.state.data.ingredients) {
      return this.state.data.ingredients.includes(id);
    }
    return false;
  };

  agregarIngrediente = (id) => {
    this.setState((state) => {
      let existe = state.data.ingredients.findIndex((i) => i == id);
      if (existe == -1) {
        state.data.ingredients.push(id);
      } else {
        state.data.ingredients.splice(existe, 1);
      }
      return {...state};
    });
  };

  ingresarInstrucciones = (t) => {
    this.setState((state) => {
      state.data.comment = t;
      return {...state};
    });
  };

  renderIngredientes = () => {
    if (this.state.ingredients) {
      let _ingredientes = this.state.ingredients.map((i) => {
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
        <View style={{marginTop: 32}}>
          <Text h5 style={{marginBottom: 16}}>
            Ingredientes
          </Text>
          {_ingredientes}
        </View>
      );
    }
  };

  renderExtras = () => {
    if (this.state.extras) {
      return this.state.extras.map((e) => {
        return (
          <View style={{marginTop: 32}}>
            {e.options.map((o) => {
              return (
                <View>
                  <Text h5 style={{marginBottom: 16}}>
                    {o.name} (Min. {o.min} Max. {o.max})
                  </Text>
                  {o.suboptions.map((_o) => (
                    <CheckBox
                      style={{flex: 1}}
                      checked={this.subOpcionAgregada(o.id, _o.id)}
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      title={_o.name}
                      onPress={() =>
                        this.seleccionarOpcion(
                          o.name,
                          o.min,
                          o.max,
                          o.id,
                          _o.id,
                        )
                      }
                    />
                  ))}
                </View>
              );
            })}
          </View>
        );
      });
    }
  };

  plus = () => {
    this.setState((state) => {
      state.data.quantity = parseInt(state.data.quantity) + 1;
      return {...state};
    });
    setTimeout(() => {
      this.props.agregarProducto(Object.assign({}, this.state.data));
    });
  };

  minus = () => {
    this.setState((state) => {
      if (parseInt(state.data.quantity) - 1 > -1) {
        state.data.quantity = parseInt(state.data.quantity) - 1;
      }
      return {...state};
    });
    setTimeout(() => {
      this.props.agregarProducto(Object.assign({}, this.state.data));
    });
  };

  add = () => {
    console.log(this.state.data);
    this.props.agregarProducto(Object.assign({}, this.state.data));
    this.props.navigation.pop();
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: '#ffff'}}
        behavior="padding">
        <View style={{position: 'absolute', height: 200, width: '100%'}}>
          {this.state.images ? (
            <Image
              style={{width: '100%', height: undefined, aspectRatio: 16 / 9}}
              source={{uri: this.state.images}}
            />
          ) : (
            <></>
          )}
          <View
            style={{
              width: '100%',
              height: 200,
              backgroundColor: '#000',
              position: 'absolute',
              opacity: this.state.opacidad,
            }}></View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#ffff',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              padding: 16,
              marginTop: 200,
              paddingBottom: 100,
              elevation: 3,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name="chevron-back"
                type="ionicon"
                color={COLOR_PRIMARY}
                size={24}
                onPress={() => this.props.navigation.pop()}
              />
              <Text h3 style={{color: COLOR_PRIMARY}}>
                {this.state.name || '...'}
              </Text>
            </View>
            {this.renderIngredientes()}
            {this.renderExtras()}
            <Text h5 style={{marginTop: 32, marginBottom: 16}}>
              Instrucciones Especiales
            </Text>
            <TextInput
              multiline={true}
              value={this.state.data.comment}
              numberOfLines={4}
              underlineColorAndroid="#ffff"
              style={{borderColor: 'silver', borderWidth: 1, borderRadius: 16}}
              onChangeText={(t) => this.ingresarInstrucciones(t)}
            />
          </View>
        </ScrollView>
        <LinearGradient
          colors={['#ffffff00', COLOR_BG, COLOR_BG, COLOR_BG]}
          style={{
            position: 'absolute',
            bottom: 0,
            height: 100,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Button
              icon={
                <Icon
                  name="minus"
                  type="font-awesome"
                  color="#ffff"
                  size={24}
                />
              }
              onPress={this.minus}
              buttonStyle={{
                borderRadius: 32,
                backgroundColor: COLOR_PRIMARY,
              }}></Button>
            <Text h4 style={{marginHorizontal: 16}}>
              {this.state.data.quantity}
            </Text>
            <Button
              icon={
                <Icon name="plus" type="font-awesome" color="#ffff" size={24} />
              }
              backgroundColor={COLOR_PRIMARY}
              onPress={this.plus}
              buttonStyle={{
                borderRadius: 32,
                backgroundColor: COLOR_PRIMARY,
              }}></Button>
          </View>
          <CurrencyFormat
            value={this.state.data.quantity * this.state.data.price}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
            renderText={(value) => <Text h5>{value}</Text>}
          />

          <Button
            buttonStyle={{borderRadius: 32, backgroundColor: COLOR_PRIMARY}}
            icon={
              <Icon
                name="cart-plus"
                type="font-awesome"
                color="#ffff"
                size={24}
              />
            }
            title=" Pedido"
            onPress={this.add}></Button>
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
    productos: state.Pedido.productos,
  };
};
const mapearAcciones = (dispatch) => {
  return {
    agregarProducto: (p) => {
      dispatch(agregarProducto(p));
    },
  };
};
export default connect(mapearEstado, mapearAcciones)(Producto);
