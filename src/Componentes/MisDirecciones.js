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
  Animated,
  ImageBackground,
  Modal,
  Dimensions,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Montserrat} from 'utils/fonts';
import Input from 'screens/SiginIn/components/Input';
import {COLOR_PRIMARY} from 'Constantes';
import SvgClose from 'svgs/forgotPass/SvgClose';
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
import {navigate} from 'utils/navigation';
import {Icon} from 'react-native-elements';

const {width, heigth} = Dimensions.get('screen');

class MisDirecciones extends React.Component {
  state = {
    nombrePila: '',
    correoElectronico: '',
    password: '',
    userRegistered: true,
  };

  onSignUp = () => {
    const data = {
      name: this.state.nombrePila,
      email: this.state.correoElectronico,
      password: this.state.password,
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal
          transparent={true}
          animationType={'fade'}
          visible={this.state.userRegistered}>
          <View style={styles.modalBackground}>
            <View style={styles.cardOverlay}>
              <LottieView
                autoPlay
                loop={false}
                autoSize
                style={{width: '100%', top: 0, position: 'absolute', left: 0}}
                source={require('Animaciones/confetti.json')}
              />
              <Text style={[styles.desc, {fontWeight: 'bold'}]}>
                Usuario registrado exitosamente
              </Text>

              <TouchableOpacity
                style={styles.btnGoToLogin}
                onPress={() => {
                  this.setState({userRegistered: false});
                  this.props.navigation.navigate('AgregarUbicacion');
                }}>
                <Text style={{color: 'white'}}>Añadir dirección</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <ImageBackground
          source={require('imagenes/bgfondo.png')}
          style={styles.bgimage}>
          <StatusBar
            translucent={true}
            backgroundColor={'transparent'}
            barStyle={'light-content'}
          />
          <View style={[styles.header, {position: 'relative'}]}>
            <View
              style={{
                backgroundColor: COLOR_PRIMARY,
                position: 'absolute',
                width: '100%',
                height: 96,
              }}></View>
            <Text style={styles.title}>Registro</Text>
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

          <View>
            <Image
              source={require('imagenes/logo-negro.png')}
              style={{
                alignSelf: 'center',
                marginTop: 0,
                marginBottom: 0,
                width: 250,
                resizeMode: 'contain',
              }}></Image>
            <LottieView
              autoPlay
              loop={false}
              autoSize
              style={{width: '100%', top: 0, position: 'absolute', left: 0}}
              source={require('Animaciones/confetti.json')}
            />
            <Text
              style={{
                textAlign: 'center',
                marginTop: 0,
                fontSize: 20,
                fontWeight: '600',
              }}>
              Crea tu cuenta
            </Text>
            <Input
              mt={20}
              placeholder={'Nombres'}
              value={this.state.nombrePila}
              onChangeText={(t) => this.setState({nombrePila: t})}
            />
            <Input
              mt={10}
              placeholder={'Correo electrónico'}
              value={this.state.correoElectronico}
              onChangeText={(c) => this.setState({correoElectronico: c})}
            />
            <Input
              mt={10}
              placeholder={'Contraseña'}
              pass={true}
              value={this.state.password}
              onChangeText={(p) => this.setState({password: p})}
            />
          </View>
          <View
            style={{flex: 1, justifyContent: 'flex-end', marginBottom: 100}}>
            <TouchableOpacity style={styles.btnSignIn} onPress={this.onSignUp}>
              <Text style={{color: 'white'}}>Registrarme</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default connect()(MisDirecciones);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8F9',
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
    position: 'absolute',
    bottom: 0,
  },
  btnGoToLogin: {
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
  bgimage: {
    resizeMode: 'cover',
    justifyContent: 'center',
    flex: 1,
  },
  btnTime: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  desc: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 15,
  },
  forgotImage: {
    width: 160,
    height: 125,
    alignSelf: 'center',
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
});
