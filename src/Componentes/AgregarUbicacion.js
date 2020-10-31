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

class AgregarUbicacion extends React.Component {
  state = {
    initialPosition: 'unknown',
    location: 'unknown',
    lat: '37.78825',
    lng: '-122.4324',
    direccion: '',
    addressTag: '',
    addressNotes: '',
    searchResults: null,
    isShowingResults: false,
    ownLocationFounded: false,
  };

  watchID: ?number = null;

  componentDidMount() {
    Geocoder.init('AIzaSyCRefQwJ3m-PnXG2Zohneg-pk1VkRRWk4o');
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        this.setState({
          lat: location.latitude,
          lng: location.longitude,
          ownLocationFounded: true,
        });
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
    if (!this.state.ownLocationFounded) {
      this.setState({lat: region.latitude, lng: region.longitude});
      this.buscarDireccion();
    }
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

  onPressSaveAddress() {
    console.log('onPressedAddress');
    AsyncStorage.getItem('user').then((user) => {
      userObj = JSON.parse(user);
      userId = JSON.parse(user).id;

      const addressData = {
        name: userObj.name,
        lastname: userObj.lastname ? userObj.lastname : '',
        address: this.state.direccion,
        address_notes: this.state.addressNotes,
        location: `{\"lat\": ${this.state.lat}, \"lng\": ${this.state.lng}}`,
        tag: this.state.tag,
        default: false,
      };

      AsyncStorage.getItem('token').then((token) => {
        console.log(JSON.stringify(addressData));
        fetch(
          `https://apiv4.ordering.co/v400/en/mydomi/users/${userId}/addresses`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(addressData),
          },
        )
          .then((response) => {
            if (response.error) {
              Alert.alert(
                'Ha ocurrido algo inesperado. Intenta nuevamente',
                'Error al guardar',
              );
            } else {
              Alert.alert('Dirección guardada con éxito', 'Listo');
              this.props.navigation.pop();
            }
            console.log('SUCCESS', response.data);
          })
          .catch((err) => {
            console.error('ERROR', err);
          });
      });

      // global.ordering.users(userId).addresses(null).save(addressData).then(async(r) => {
      //   console.log(r.response)
      // })
    });
  }

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
          <View style={[styles.header, {position: 'relative'}]}>
            <View
              style={{
                backgroundColor: COLOR_PRIMARY,
                position: 'absolute',
                width: '100%',
                height: 96,
              }}></View>
            <Text style={styles.title}>Agregar dirección</Text>
            <TouchableOpacity
              style={styles.btnClose}
              onPress={() => this.props.navigation.pop()}>
              <Icon
                name="chevron-back"
                type="ionicon"
                color="#ffff"
                size={24}
              />
            </TouchableOpacity>
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
          <Input
            mt={20}
            value={this.state.addressNotes}
            onChangeText={(t) => this.setState({addressNotes: t})}
            placeholder={'Notas adicionales'}></Input>

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
                this.state.tag == 'home'
                  ? {backgroundColor: COLOR_PRIMARY}
                  : {},
              ]}
              onPress={() => this.setState({tag: 'home'})}>
              <Text
                style={
                  (styles.textTab,
                  this.state.tag == 'home' ? {color: '#ffff'} : {})
                }>
                Casa
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.botonTab,
                this.state.tag == 'office'
                  ? {backgroundColor: COLOR_PRIMARY}
                  : {},
              ]}
              onPress={() => this.setState({tag: 'office'})}>
              <Text
                style={
                  (styles.textTab,
                  this.state.tag == 'office' ? {color: '#ffff'} : {})
                }>
                Oficina
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.botonTab,
                this.state.tag == 'favorites'
                  ? {backgroundColor: COLOR_PRIMARY}
                  : {},
              ]}
              onPress={() => this.setState({tag: 'favorites'})}>
              <Text
                style={[
                  styles.textTab,
                  this.state.tag == 'favorites' ? {color: '#ffff'} : {},
                ]}>
                Favoritos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.botonTab,
                this.state.tag == 'other'
                  ? {backgroundColor: COLOR_PRIMARY}
                  : {},
              ]}
              onPress={() => this.setState({tag: 'other'})}>
              <Text
                style={[
                  styles.textTab,
                  this.state.tag == 'other' ? {color: '#ffff'} : {},
                ]}>
                Otro
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.btnSignIn}
            onPress={() => this.onPressSaveAddress()}>
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
