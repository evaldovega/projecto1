import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  COLOR_ACCENT,
  COLOR_PRIMARY,
  COLOR_TEXT,
  COLOR_BG_TAPBAR,
  COLOR_BG,
  COLOR_DESATIVADO,
} from 'Constantes';
import {connect} from 'react-redux';
class TabBarNegocio extends React.Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: COLOR_BG_TAPBAR,
          padding: 16,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          height: 70,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Negocio')}>
            <Icon
              name="home"
              type="font-awesome"
              size={32}
              color={COLOR_DESATIVADO}
              onPress={() => this.props.navigation.navigate('Inicio')}
            />
          </TouchableOpacity>
          <Text style={{color: COLOR_DESATIVADO, fontSize: 24}}>Pedidos</Text>

          <TouchableOpacity onPress={() => this.props.navigation.push('Orden')}>
            <View
              style={{
                backgroundColor: COLOR_BG,
                width: 85,
                height: 85,
                borderRadius: 48,
                marginTop: -42,
                marginHorizontal: 24,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: COLOR_PRIMARY,
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{color: '#ffff', fontSize: 24, fontWeight: 'bold'}}>
                  {this.props.productos.reduce((a, b) => a + b.quantity, 0)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const mapearEstado = (state) => {
  return {
    productos: state.Pedido.productos,
  };
};
export default connect(mapearEstado)(TabBarNegocio);
