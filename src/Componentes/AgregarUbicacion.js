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

class AgregarUbicacion extends React.Component {
  state = {
    initialPosition: 'unknown',
    location: 'unknown',
    lat: '37.78825',
    lng: '-122.4324',
    direccion: '',
    searchResults: null,
    isShowingResults: false,
  };

  watchID: ?number = null;

  componentDidMount() {
    Geocoder.init('AIzaSyCRefQwJ3m-PnXG2Zohneg-pk1VkRRWk4o');
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        this.setState({lat: location.latitude, lng: location.longitude});
        this.buscarDireccion();
      })
      .catch((error) => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }
  buscarDireccionPalabras(address) {
    Geocoder.from(address)
      .then((json) => {
        var location = json.results[0].geometry.location;
        this.setState(location);
      })
      .catch((error) => console.warn(error));
  }
  buscarDireccion() {
    Geocoder.from(this.state.lat, this.state.lng)
      .then((json) => {
        var addressComponent = json.results[0].address_components[0];
        this.setState({direccion: json.results[0].formatted_address});
      })
      .catch((error) => console.warn(error));
  }

  onRegionChangeCompleteMap(region) {
    this.setState({lat: region.latitude, lng: region.longitude});
    this.buscarDireccion();
  }

  onSearchLocation = async (text) => {
    this.setState({direccion: text});
    if (text != '' && text != ' ') {
      fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyCRefQwJ3m-PnXG2Zohneg-pk1VkRRWk4o&input=${this.state.direccion}`,
        {
          method: 'POST',
        },
      )
        .then((r) => r.json())
        .then((response) => {
          this.setState({
            searchResults: response.predictions,
            isShowingResults: true,
          });
        })
        .catch((err) => {
          console.log(err.toString());
        });
    } else {
      this.setState({isShowingResults: false});
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('imagenes/bgfondo.png')}
          style={styles.bgimage}>
          <StatusBar
            translucent={true}
            backgroundColor={'transparent'}
            barStyle={'light-content'}
            style={{zIndex: 9}}
          />
          <View style={styles.header}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.title, {marginLeft: 8, fontWeight: 'bold'}]}>
                Agregar dirección
              </Text>
            </View>

            <TouchableOpacity style={styles.btnClose}></TouchableOpacity>
            <TouchableOpacity style={styles.btnOption}></TouchableOpacity>
          </View>

          <MapView
            style={styles.mapView}
            initialRegion={{
              latitude: this.state.lat,
              longitude: this.state.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={{
              latitude: this.state.lat,
              longitude: this.state.lng,
              latitudeDelta: 0.0052,
              longitudeDelta: 0.0051,
            }}
            onRegionChangeComplete={(e) => this.onRegionChangeCompleteMap(e)}>
            <Marker
              coordinate={{
                latitude: this.state.lat,
                longitude: this.state.lng,
              }}></Marker>
          </MapView>
          <View style={styles.autocompleteContainer}>
            <Input
              mt={20}
              value={this.state.direccion}
              placeholder={'Dirección'}
              icon={true}
              fa={'map-marker'}
              onChangeText={(t) => this.onSearchLocation(t)}></Input>
            {this.state.isShowingResults && (
              <FlatList
                data={this.state.searchResults}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      style={styles.resultItem}
                      onPress={() => {
                        this.setState({
                          direccion: item.description,
                          isShowingResults: false,
                        });
                        this.buscarDireccionPalabras(item.description);
                      }}>
                      <Text>{item.description}</Text>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item) => item.id}
                style={styles.searchResultsContainer}
              />
            )}
          </View>
          <Input mt={20} placeholder={'Apartamento o casa'}></Input>
          <Input mt={20} placeholder={'Notas adicionales'}></Input>

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
                this.state.mostrar == 1 ? {backgroundColor: COLOR_PRIMARY} : {},
              ]}
              onPress={() => this.setState({mostrar: 1})}>
              <Text
                style={
                  (styles.textTab,
                  this.state.mostrar == 1 ? {color: '#ffff'} : {})
                }>
                Casa
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.botonTab,
                this.state.mostrar == 2 ? {backgroundColor: COLOR_PRIMARY} : {},
              ]}
              onPress={() => this.setState({mostrar: 2})}>
              <Text
                style={
                  (styles.textTab,
                  this.state.mostrar == 2 ? {color: '#ffff'} : {})
                }>
                Oficina
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.botonTab,
                this.state.mostrar == 3 ? {backgroundColor: COLOR_PRIMARY} : {},
              ]}
              onPress={() => this.setState({mostrar: 3})}>
              <Text
                style={[
                  styles.textTab,
                  this.state.mostrar == 3 ? {color: '#ffff'} : {},
                ]}>
                Favoritos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.botonTab,
                this.state.mostrar == 4 ? {backgroundColor: COLOR_PRIMARY} : {},
              ]}
              onPress={() => this.setState({mostrar: 4})}>
              <Text
                style={[
                  styles.textTab,
                  this.state.mostrar == 4 ? {color: '#ffff'} : {},
                ]}>
                Otro
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btnSignIn}>
            <Text style={{color: 'white'}}>Guardar</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

export default connect()(AgregarUbicacion);
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
  txtBtnBottom: {
    fontSize: 14,
    color: '#ABA4AC',
    fontFamily: Montserrat,
  },
  txtBtnBottomActive: {
    fontSize: 14,
    color: '#0084F4',
    fontFamily: Montserrat,
  },
  lineVertical: {
    width: 1,
    backgroundColor: '#F7F8F9',
    borderRadius: 16,
  },
  mapView: {
    height: 200,
    marginTop: 20,
    zIndex: 8,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 12,
  },
  autocompleteContainer: {
    zIndex: 10,
  },
  searchResultsContainer: {
    width: '80%',
    height: 200,
    backgroundColor: '#fff',
    position: 'absolute',
    alignSelf: 'center',
    top: 70,
  },
});
