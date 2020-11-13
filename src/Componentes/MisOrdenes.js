import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  StatusBar,
  Image,
  VirtualizedList,
  FlatList,
  Animated,
  Easing,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Montserrat} from 'utils/fonts';
import {Icon} from 'react-native-elements';
import Input from 'screens/SiginIn/components/Input';
import {COLOR_PRIMARY, COLOR_BG_TAPBAR} from 'Constantes';
import {
  SearchBar,
  Divider,
  Rating,
  ListItem,
  Avatar,
} from 'react-native-elements';
import SvgOption from 'svgs/staticsHealth/SvgOptions';
import SvgSetting from 'svgs/staticsHealth/SvgSetting';
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
import {navigate, Navigator} from 'utils/navigation';
import GetLocation from 'react-native-get-location';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-community/async-storage';

const ESTADO = [
  'Pendiente',
  'Completada',
  'Anulada',
  'El conductor esta esperando en el negocio',
  'Preparación completada',
  'El negocio ha rechazado el pedido',
  'Pedido rechazado por el conductor',
  'Pedido aceptado por el negocio',
  'Pedido aceptado por el conductor',
  'El conductor ha llegado al negocio',
  'El pedido no se puede recoger',
  'Pedido entregado',
  'Pedido fallido',
];
class MisOrdenes extends React.Component {
  state = {
    ordenesList: [],
  };

  componentDidMount() {
    this.cargarOrdenes();
  }

  cargarOrdenes = () => {
    global.ordering
      .orders()
      .get()
      .then((r) => {
        if (r.response.data.error) {
          Alert.alert('Error al cargar las órdenes');
        } else {
          this.setState({ordenesList: r.response.data.result});
          this.state.ordenesList.forEach((orden, i) => {
            console.log(orden);
          });
        }
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle={'light-content'}
          style={{zIndex: 9}}
        />
        <View style={[styles.header, {position: 'relative'}]}>
          <View
            style={{
              backgroundColor: COLOR_PRIMARY,
              position: 'absolute',
              width: '100%',
              height: 96,
            }}></View>
          <Text style={styles.title}>Mis órdenes</Text>
          <TouchableOpacity
            style={styles.btnClose}
            onPress={() => this.props.navigation.pop()}>
            <Icon name="chevron-back" type="ionicon" color="#ffff" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOption}></TouchableOpacity>
        </View>
        <View>
          {this.state.ordenesList.map((orden, i) => (
            <ListItem key={i} bottomDivider>
              <Avatar source={{uri: orden.business.logo}} />
              <ListItem.Content>
                <ListItem.Title>{orden.business.name}</ListItem.Title>
                <ListItem.Subtitle>
                  Estado de la orden: {ESTADO[orden.status]}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      </View>
    );
  }
}
const mapearEstado = (state) => {
  return {
    name: state.Usuario.name,
  };
};

export default connect()(MisOrdenes);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8F9',
  },
  bgimage: {
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: COLOR_PRIMARY,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    height: 96,
    overflow: 'hidden',
    paddingTop: getStatusBarHeight(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultItem: {
    width: '100%',
    justifyContent: 'center',
    height: 40,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingLeft: 15,
  },
  title: {
    fontFamily: Montserrat,
    fontSize: 17,
    color: '#fff',
    fontWeight: '500',
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
  btnSignIn: {
    backgroundColor: COLOR_PRIMARY,
    borderRadius: 24,
    width: '80%',
    marginLeft: '10%',
    marginTop: 20,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTime: {
    flexDirection: 'row',
    height: 48,
    margin: 16,
    borderRadius: 24,
    backgroundColor: '#FFF',
  },
  btnTime: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botonTab: {
    flex: 1,
    padding: 16,
    borderRadius: 32,
    alignItems: 'center',
  },
  textTab: {
    textAlign: 'center',
  },
  txtTime: {
    fontFamily: Montserrat,
    fontSize: 12,
    color: '#1A051D',
  },
  svgHover: {
    position: 'absolute',
    bottom: 0,
    left: 40,
  },
  boxStatus: {
    margin: 16,
    backgroundColor: '#FFA26B',
    borderRadius: 16,
    paddingTop: 20,
    paddingLeft: 24,
    paddingBottom: 23,
  },
  txtGood: {
    fontSize: 20,
    color: '#FFF',
    fontFamily: Montserrat,
    fontWeight: '500',
  },
  txtKeep: {
    fontSize: 16,
    color: '#FFF',
    fontFamily: Montserrat,
  },
  boxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerChart: {
    borderRadius: 32,
    backgroundColor: '#FFF',
    marginHorizontal: 0,
    marginTop: 16,
    overflow: 'hidden',
    elevation: 3,
  },
  boxContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  txtTitle: {
    marginLeft: 8,
    fontFamily: Montserrat,
    fontSize: 14,
    color: '#1A051D',
    flex: 1,
  },
  line: {
    height: 1,
    backgroundColor: '#F7F8F9',
    borderRadius: 16,
  },
  boxBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  btnBottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
});
