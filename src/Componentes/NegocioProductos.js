import React from 'react';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Avatar, Button} from 'react-native-elements';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  StatusBar,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {Montserrat} from 'utils/fonts';
import {connect} from 'react-redux';
import TabBarNegocio from 'Componentes/TabBarNegocio';
import {Icon, Badge} from 'react-native-elements';
import {COLOR_PRIMARY} from 'Constantes';
class NegocioProductos extends React.Component {
  state = {
    desactivar: false,
    categoria: {},
  };

  componentDidMount() {
    //Obtener los productos de la categoria
    let categoriaData = this.props.data.categories.find(
      (c) => c.id == this.props.route.params.categoria,
    );
    console.log(categoriaData);
    let productos = categoriaData.products;
    productos.push({id: -2});
    this.setState({productos: productos, nombre_categoria: categoriaData.name});
  }

  ver = (item) => {
    if (!this.state.desactivar) {
      this.setState({desactivar: true});
      //{producto:item,negocio_id:this.props.data.id}
      this.props.navigation.push('Producto', {
        id: item.id,
        categoria: this.props.route.params.categoria,
      });
      setTimeout(() => {
        this.setState({desactivar: false});
      }, 2000);
    }
  };

  badge = (item) => {
    let _p = this.props.productos.find((p) => p.id == item.id);
    if (_p) {
      return (
        <Badge
          size={32}
          value={_p.quantity}
          status="success"
          containerStyle={{position: 'absolute', top: -4, left: -4}}
        />
      );
    }
  };

  renderItem = ({item}) => {
    if (item.id == -2) {
      return <View style={{height: 32}}></View>;
    }
    return (
      <TouchableWithoutFeedback
        disabled={this.state.desactivar}
        onPress={() => this.ver(item)}>
        <View
          style={[
            styles.card,
            {flex: 1, justifyContent: 'flex-start', flexDirection: 'row'},
          ]}>
          <Avatar
            size={64}
            source={item.images != null ? {uri: item.images} : null}
            avatarStyle={{borderRadius: 16}}
          />
          {this.badge(item)}
          <View style={styles.card_content}>
            <Text style={{fontSize: 16, fontFamily: Montserrat}}>
              {item.name}
            </Text>
            <Text>$ {item.price}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return (
      <View style={styles.container}>
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
          <Text style={styles.title}>{this.state.nombre_categoria}</Text>
          <Text></Text>
        </View>
        <SafeAreaView style={{flex: 1, position: 'relative'}}>
          <FlatList
            data={this.state.productos}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
        <TabBarNegocio {...this.props} />
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
export default connect(mapearEstado)(NegocioProductos);

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginTop: 16,
    overflow: 'visible',
  },
  card_content: {
    padding: 16,
  },
  card_bottom: {
    flexDirection: 'row',
  },
  btnBottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  txtBtnBottom: {
    fontSize: 14,
    color: '#ABA4AC',
    fontFamily: Montserrat,
  },
  line: {
    height: 1,
    backgroundColor: '#F7F8F9',
    borderRadius: 16,
  },
  lineVertical: {
    width: 1,
    backgroundColor: '#F7F8F9',
    borderRadius: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F8F9',
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
  btnClose: {
    position: 'absolute',
    bottom: 20,
    left: 16,
  },
  btnOption: {
    position: 'absolute',
    bottom: 20,
    right: 16,
  },
});
