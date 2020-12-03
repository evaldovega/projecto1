import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Alert,
  Linking,
  Dimensions,
  Modal,
} from 'react-native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Lato, Montserrat} from 'utils/fonts';
import CurrencyFormat from 'react-currency-format';
import {
  Divider,
  ListItem,
  Avatar,
  Button,
  Icon,
  BottomSheet,
  Header,
} from 'react-native-elements';
import {
  COLOR_BG_TAPBAR,
  COLOR_DESATIVADO,
  COLOR_PRIMARY,
  COLOR_TEXT,
  PAGO_SANDBOX,
  PAGO_PRODUCTION,
  IUKAX_ACTION_URL,
} from 'Constantes';
import {borrarProducto, vaciar} from 'Redux/actions/Pedido';
import {connect} from 'react-redux';
import moment from 'moment';
import 'react-native-get-random-values';
import LottieView from 'lottie-react-native';
import {nanoid} from 'nanoid';

const alturaBottom = 54 + getStatusBarHeight();
const {width, heigth} = Dimensions.get('screen');
class Orden extends React.Component {
  state = {
    orden: {},
    direccion: null,
    tipo_envio: 1,
    metodo_pago: null,
    mostrar_direcciones: false,
    mostrar_metodos_pago: false,
    urlPagoPaymentMethod: '',
    isCheckingPayment: false,
  };

  componentDidMount() {
    //console.log('Metodos de pago ', this.props.data.paymethods[0]);
    console.log('Direccion', global.addressSelected);
    if (global.addressSelected != null) {
      this.setState({direccion: global.addressSelected});
    }
  }

  componentDidUpdate(prev) {
    if (this.props.productos.length == 0) {
      this.props.navigation.reset({
        index: 0,
        routes: [{name: 'Inicio'}],
      });
    }
  }

  openPaymentLink(url) {
    try {
      const _url = encodeURI(url);
      Linking.openURL(url);
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  renderProductos = () => {
    return this.props.productos.map((p) => {
      return (
        <ListItem bottomDivider>
          <Text style={{fontSize: 18}}>{p.quantity}</Text>
          <ListItem.Content>
            <ListItem.Title>{p.name} </ListItem.Title>
            <CurrencyFormat
              value={p.quantity * p.price}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
              renderText={(v) => (
                <Text style={{color: COLOR_PRIMARY, fontSize: 20}}>{v}</Text>
              )}
            />
          </ListItem.Content>
          <Button
            buttonStyle={{backgroundColor: COLOR_PRIMARY, borderRadius: 32}}
            onPress={() =>
              this.props.navigation.navigate('Producto', {
                id: p.id,
                categoria: p.categoria,
              })
            }
            icon={<Icon name="pencil" color="#ffff" type="ionicon" />}
          />
          <Button
            buttonStyle={{backgroundColor: 'red', borderRadius: 32}}
            onPress={() => this.props.borrarProducto(p)}
            icon={<Icon name="trash" color="#ffff" type="ionicon" />}
          />
        </ListItem>
      );
    });
  };

  establecerDireccion = (d) => {
    this.setState({
      mostrar_direcciones: false,
      direccion: d,
    });
  };
  establecerMetodoPago = (d) => {
    this.setState({
      mostrar_metodos_pago: false,
      metodo_pago: d,
    });
  };

  renderDirecciones = () => {
    return (
      <BottomSheet isVisible={this.state.mostrar_direcciones}>
        <Header
          containerStyle={{backgroundColor: '#ffff'}}
          centerComponent={{
            text: 'Mis direcciones',
            style: {color: COLOR_PRIMARY},
          }}
          rightComponent={{
            icon: 'close',
            color: COLOR_PRIMARY,
            onPress: () => {
              this.setState({mostrar_direcciones: false});
            },
          }}
        />
        {global.userAddresses.map((l, i) => (
          <ListItem key={i} onPress={() => this.establecerDireccion(l)}>
            <ListItem.Content>
              <ListItem.Title>{l.address}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    );
  };

  renderMetodosPago = () => {
    return (
      <BottomSheet
        style={{position: 'absolute', flex: 1, bottom: 0}}
        isVisible={this.state.mostrar_metodos_pago}>
        <Header
          containerStyle={{backgroundColor: '#ffff'}}
          centerComponent={{
            text: 'Métodos de pago',
            style: {color: COLOR_PRIMARY},
          }}
          rightComponent={{
            icon: 'close',
            color: COLOR_PRIMARY,
            onPress: () => {
              this.setState({mostrar_metodos_pago: false});
            },
          }}
        />
        {this.props.data.paymethods.map((l, i) => (
          <ListItem key={i} onPress={() => this.establecerMetodoPago(l)}>
            <ListItem.Content>
              <ListItem.Title>{l.paymethod.name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    );
  };

  guardar = async () => {
    console.log('Guardar');
    let productos = this.props.productos.map((p) => {
      return {
        id: p.id,
        price: p.price,
        quantity: p.quantity,
        comment: p.comment,
        ingredients: p.ingredients,
        options: p.options,
      };
    });

    if (this.state.metodo_pago == null || this.state.metodo_pago == undefined) {
      Alert.alert('Espera un momento', 'Debes seleccionar un método de pago');
    }

    let data = {
      customer_id: this.props.id,
      paymethod_id: this.state.metodo_pago.paymethod_id,
      business_id: this.props.data.id,
      delivery_type: this.state.tipo_envio,
      location: this.state.direccion.location,
      products: productos,
    };

    // Verificacion de metodo de pago para pasarela PaGo
    let codigoReferencia = nanoid(10);
    if (this.state.metodo_pago.paymethod_id == 33) {
      console.log(this.state.metodo_pago);

      let totalPagar =
        parseFloat(this.props.data.delivery_price) +
        this.props.productos.reduce(
          (a, p) => a + parseFloat(p.quantity) * p.price,
          0,
        ) +
        this.props.productos.reduce(
          (a, p) => a + parseFloat(p.quantity) * p.price,
          0,
        ) *
          (parseFloat(this.props.data.service_fee) / 100) +
        this.props.productos.reduce((a, p) => a + p.quantity * p.price, 0) *
          (parseFloat(this.props.data.tax) / 100);

      orderXMLData = `<data><commerceName>G4 SOFT</commerceName><commerceCode>${this.state.metodo_pago.data.cu_mobile}</commerceCode><ipAddress>127.0.0.1</ipAddress><additionalObservations>Orden generada por sender.com.co</additionalObservations><purchaseData><currencyCode>170</currencyCode><purchaseCode>${codigoReferencia}</purchaseCode><totalAmount>${totalPagar}</totalAmount><terminalCode>${this.state.metodo_pago.data.t_mobile}</terminalCode><iva>${this.props.data.tax}</iva></purchaseData><urlResponse>https://iukax.com/api/Payments/PostPaGp</urlResponse><orderWeb><localReference1/><localReference2/><localReference3/><localReference4/><localReference5/><localReference6/><localReference7/><localReference8/></orderWeb></data>`;

      let formAction = this.state.metodo_pago.sandbox
        ? PAGO_SANDBOX
        : PAGO_PRODUCTION;

      let urlPayment =
        IUKAX_ACTION_URL + formAction + '&valueData=' + orderXMLData;
      this.openPaymentLink(urlPayment);
      this.comprobarPago(codigoReferencia, data);
    } else {
      let r = await global.ordering
        .orders()
        .save(data)
        .then((r) => {
          console.log(r.response.data);
          if (r.response.data.error) {
            Alert.alert(
              'No se pudo completar el pedido',
              r.response.data.result.join('\n'),
            );
          } else {
            this.props.navigation.push('OrdenDetalle', {
              id: r.response.data.result.api.orderId,
            });
          }
        });
    }
  };

  comprobarPago = (numeroReferencia, data) => {
    console.log('Comprobando pago: ', numeroReferencia);
    const _this = this;
    this.setState({isCheckingPayment: true});
    fetch(
      'https://iukax.com/api/Payments/GetByPurchaseCode/' + numeroReferencia,
    )
      .then((r) => {
        if (r.status == 204) {
          setTimeout(function () {
            _this.comprobarPago(numeroReferencia, data);
          }, 5000);
        }
        return r;
      })
      .then((r) => r.json())
      .then((r) => {
        this.setState({isCheckingPayment: false});
        if (
          ['00', '08', '11', '76', '77', '78', '79', '80', '81'].includes(
            r.codRespuesta,
          )
        ) {
          let r = global.ordering
            .orders()
            .save(data)
            .then((r) => {
              console.log(r.response.data);
              if (r.response.data.error) {
                Alert.alert(
                  'No se pudo completar el pedido',
                  r.response.data.result.join('\n'),
                );
              } else {
                this.props.navigation.push('OrdenDetalle', {
                  id: r.response.data.result.api.orderId,
                });
              }
            });
        }
      });
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#ffff'}}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle={'light-content'}
        />
        <View style={styles.header}>
          <Icon
            name="chevron-back"
            type="ionicon"
            color="#ffff"
            size={24}
            onPress={() => this.props.navigation.pop()}
          />
          <Text style={styles.title}>Detalle Pedido</Text>
          <Icon
            name="trash"
            type="ionicon"
            color="#ffff"
            size={24}
            onPress={this.props.vaciar}
          />
        </View>

        <Modal
          transparent={true}
          animationType={'fade'}
          visible={this.state.isCheckingPayment}>
          <View style={styles.modalBackground}>
            <View style={styles.cardOverlay}>
              <LottieView
                autoPlay
                loop={false}
                autoSize
                style={{width: '100%', alignSelf: 'center'}}
                source={require('Animaciones/waiting_payment.json')}
              />
              <Text
                style={{fontWeight: '400', fontSize: 18, alignSelf: 'center'}}>
                Esperando pago
              </Text>
            </View>
          </View>
        </Modal>

        <ScrollView style={{flex: 1}}>
          <Text
            style={{
              fontSize: 32,
              color: COLOR_DESATIVADO,
              textAlign: 'center',
              marginVertical: 8,
            }}>
            {this.props.data.name}
          </Text>
          {this.renderProductos()}
          <View style={{paddingHorizontal: 42}}>
            <View
              style={{
                marginTop: 16,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 24, color: COLOR_TEXT}}>
                Total parcial
              </Text>

              <CurrencyFormat
                value={this.props.productos.reduce(
                  (a, p) => a + p.quantity * p.price,
                  0,
                )}
                displayType={'text'}
                thousandSeparator={true}
                decimalScale={2}
                prefix={'$'}
                renderText={(v) => (
                  <Text
                    style={{
                      fontSize: 24,
                      color: COLOR_PRIMARY,
                      textAlign: 'right',
                    }}>
                    {v}
                  </Text>
                )}
              />
            </View>

            <View
              style={{
                marginTop: 16,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 24, color: COLOR_TEXT}}>Envío</Text>
              <CurrencyFormat
                value={this.props.data.delivery_price}
                displayType={'text'}
                thousandSeparator={true}
                decimalScale={2}
                prefix={'$'}
                renderText={(v) => (
                  <Text
                    style={{
                      fontSize: 24,
                      color: COLOR_PRIMARY,
                      textAlign: 'right',
                    }}>
                    {v}
                  </Text>
                )}
              />
            </View>
            <View
              style={{
                marginTop: 16,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 24, color: COLOR_TEXT}}>
                Servicio ({this.props.data.service_fee}%)
              </Text>
              <CurrencyFormat
                value={
                  this.props.productos.reduce(
                    (a, p) => a + p.quantity * p.price,
                    0,
                  ) *
                  (this.props.data.service_fee / 100)
                }
                displayType={'text'}
                thousandSeparator={true}
                decimalScale={1}
                prefix={'$'}
                renderText={(v) => (
                  <Text
                    style={{
                      fontSize: 24,
                      color: COLOR_PRIMARY,
                      textAlign: 'right',
                    }}>
                    {v}
                  </Text>
                )}
              />
            </View>
            <View
              style={{
                marginTop: 16,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 24, color: COLOR_TEXT}}>
                Impuestos ({this.props.data.tax}%)
              </Text>
              <CurrencyFormat
                value={
                  this.props.productos.reduce(
                    (a, p) => a + p.quantity * p.price,
                    0,
                  ) *
                  (this.props.data.tax / 100)
                }
                displayType={'text'}
                decimalScale={1}
                thousandSeparator={true}
                prefix={'$'}
                renderText={(v) => (
                  <Text
                    style={{
                      fontSize: 24,
                      color: COLOR_PRIMARY,
                      textAlign: 'right',
                    }}>
                    {v}
                  </Text>
                )}
              />
            </View>
            <Divider style={{marginVertical: 10}}></Divider>
            <View
              style={{
                marginTop: 16,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{fontSize: 24, color: COLOR_TEXT, fontWeight: 'bold'}}>
                Total
              </Text>
              <CurrencyFormat
                value={
                  parseFloat(this.props.data.delivery_price) +
                  this.props.productos.reduce(
                    (a, p) => a + parseFloat(p.quantity) * p.price,
                    0,
                  ) +
                  this.props.productos.reduce(
                    (a, p) => a + parseFloat(p.quantity) * p.price,
                    0,
                  ) *
                    (parseFloat(this.props.data.service_fee) / 100) +
                  this.props.productos.reduce(
                    (a, p) => a + p.quantity * p.price,
                    0,
                  ) *
                    (parseFloat(this.props.data.tax) / 100)
                }
                decimalScale={2}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                renderText={(v) => (
                  <Text
                    style={{
                      fontSize: 24,
                      color: COLOR_PRIMARY,
                      textAlign: 'right',
                    }}>
                    {v}
                  </Text>
                )}
              />
            </View>
            <Divider style={{marginVertical: 10}}></Divider>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: COLOR_BG_TAPBAR,
                borderRadius: 32,
                marginHorizontal: 16,
                overflow: 'hidden',
                marginVertical: 16,
              }}>
              <TouchableOpacity
                style={[
                  styles.botonTab,
                  this.state.tipo_envio == 1
                    ? {backgroundColor: COLOR_PRIMARY}
                    : {},
                ]}
                onPress={() => this.setState({tipo_envio: 1})}>
                <Text
                  style={
                    (styles.textTab,
                    this.state.tipo_envio == 1 ? {color: '#ffff'} : {})
                  }>
                  Domicilio
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.botonTab,
                  this.state.tipo_envio == 2
                    ? {backgroundColor: COLOR_PRIMARY}
                    : {},
                ]}
                onPress={() => this.setState({tipo_envio: 2})}>
                <Text
                  style={
                    (styles.textTab,
                    this.state.tipo_envio == 2 ? {color: '#ffff'} : {})
                  }>
                  Recoger
                </Text>
              </TouchableOpacity>
            </View>

            {this.state.tipo_envio == 1 ? (
              <TouchableOpacity
                style={{marginTop: 16}}
                onPress={() => this.setState({mostrar_direcciones: true})}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name="navigate-outline"
                    type="ionicon"
                    color={COLOR_PRIMARY}
                    size={24}
                  />

                  <Text style={{flex: 1, fontSize: 18}}>
                    {this.state.direccion
                      ? this.state.direccion.address
                      : 'Seleccione una dirección'}
                  </Text>
                  <Icon
                    name="chevron-down"
                    type="ionicon"
                    color={COLOR_PRIMARY}
                    size={24}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <></>
            )}

            <TouchableOpacity
              style={{marginTop: 16}}
              onPress={() => this.setState({mostrar_metodos_pago: true})}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="card-outline"
                  type="ionicon"
                  color={COLOR_PRIMARY}
                  size={24}
                />
                <Text style={{flex: 1, fontSize: 18}}>
                  {this.state.metodo_pago
                    ? this.state.metodo_pago.paymethod.name
                    : 'Seleccione un metodo de pago'}
                </Text>
                <Icon
                  name="chevron-down"
                  type="ionicon"
                  color={COLOR_PRIMARY}
                  size={24}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{height: 60}}></View>
        </ScrollView>
        {this.renderDirecciones()}
        {this.renderMetodosPago()}
        <TouchableOpacity onPress={() => this.guardar()}>
          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              height: alturaBottom,
              backgroundColor: COLOR_PRIMARY,
              borderTopEndRadius: 24,
              borderTopStartRadius: 24,
              padding: 32,
              zIndex: 99,
              elevation: 1,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#fff',
                textAlign: 'center',
                alignSelf: 'center',
              }}>
              Ordenar ahora
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapearEstado = (state) => {
  return {
    id: state.Usuario.id,
    data: state.Negocio.data,
    productos: state.Pedido.productos,
  };
};
const mapearAcciones = (dispatch) => {
  return {
    vaciar: () => {
      Alert.alert('Te has arrepentido', '¿Quieres anular el pedido?', [
        {
          text: 'Si',
          onPress: () => {
            dispatch(vaciar());
          },
          style: 'cancel',
        },
        {
          text: 'No',
        },
      ]);
    },
    borrarProducto: (p) => {
      Alert.alert('Te has arrepentido', '¿Quieres quitar este producto?', [
        {
          text: 'Si',
          onPress: () => {
            dispatch(borrarProducto(p));
          },
          style: 'cancel',
        },
        {
          text: 'No',
        },
      ]);
    },
  };
};
export default connect(mapearEstado, mapearAcciones)(Orden);

const styles = StyleSheet.create({
  botonTab: {
    flex: 1,
    padding: 16,
    borderRadius: 32,
    alignItems: 'center',
  },
  textTab: {
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLOR_PRIMARY,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    height: 96,
    paddingTop: getStatusBarHeight(),
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  title: {
    fontFamily: Montserrat,
    fontSize: 17,
    color: '#fff',
  },
  containerModal: {
    marginHorizontal: 40,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#EAE8EA',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  modalBackground: {
    backgroundColor: '#FFFFFFDE',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
  },
  cardOverlay: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    width: width - 40,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
