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
} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Lato, Montserrat} from 'utils/fonts';
import CurrencyFormat from 'react-currency-format';
import {Divider, ListItem, Avatar, Button, Icon} from 'react-native-elements';
import {COLOR_DESATIVADO, COLOR_PRIMARY, COLOR_TEXT} from 'Constantes';
import {borrarProducto, vaciar} from 'Redux/actions/Pedido';
import {connect} from 'react-redux';

const alturaBottom = 54 + getStatusBarHeight();
class Orden extends React.Component {
  state = {
    orden: {},
  };

  componentDidMount() {
    console.log('Metodos de pago ', this.props.data.paymethods);
  }

  componentDidUpdate(prev) {
    if (this.props.productos.length == 0) {
      this.props.navigation.reset({
        index: 0,
        routes: [{name: 'Inicio'}],
      });
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
                Total Parcial
              </Text>

              <CurrencyFormat
                value={this.props.productos.reduce(
                  (a, p) => a + p.quantity * p.price,
                  0,
                )}
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
                  this.props.data.delivery_price +
                  this.props.productos.reduce(
                    (a, p) => a + p.quantity * p.price,
                    0,
                  )
                }
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
          </View>

          <View style={{height: 60}}></View>
        </ScrollView>

        <View
          style={{
            position: 'absolute',
            width: '90%',
            height: alturaBottom,
            bottom: 0,
            left: '5%',
            backgroundColor: COLOR_PRIMARY,
            borderTopEndRadius: 24,
            borderTopStartRadius: 24,
            padding: 32,
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
      </View>
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
});
