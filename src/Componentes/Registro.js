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
  Easing,
  RefreshControl,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Montserrat} from 'utils/fonts';
import Input from 'screens/SiginIn/components/Input';
import {COLOR_PRIMARY} from 'Constantes';
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

class Registro extends React.Component {
  state = {
    nombrePila: '',
    correoElectronico: '',
    password: '',
  };

  onSignUp = () => {
    const data = {
      name: this.state.nombrePila,
      email: this.state.correoElectronico,
      password: this.state.password,
    };

    global.ordering
      .users()
      .save(data)
      .then(async (r) => {
        console.log(r);
        if (r.response.data.error) {
          Alert.alert(
            'Ha ocurrido un error',
            r.response.data.result.join('\n'),
          );
        } else {
          const {
            id,
            name,
            lastname,
            birthdate,
            email,
            phone,
            photo,
            data_map,
            session,
          } = r.response.data.result;

          // global.ordering.users().auth(
          //     {
          //         email: email,
          //         password: password
          //     }
          // ).then(async (r)=>{
          //     console.log(r)
          //     if(r.response.data.error){
          //         Alert.alert('Ha ocurrido un error',r.response.data.result.join("\n"))
          //     }else{
          //         const {id,name,lastname,birthdate,email,phone,photo,data_map,session}=r.response.data.result

          //         await AsyncStorage.setItem('token',session.access_token)
          //         await AsyncStorage.setItem('user',JSON.stringify({id,name,lastname,birthdate,email,phone,photo,data_map}))
          //         navigate('Inicio');
          //     }
          // }).catch(error=>{
          //     console.log("ERROR")
          //     console.log(error)
          // })
        }
      })
      .catch((error) => {
        console.log('ERROR');
        console.log(error);
      });
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
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: 24, height: undefined}}
              source={require('imagenes/logo.png')}
            />
            <Text style={[styles.title, {marginLeft: 8, fontWeight: 'bold'}]}>
              Registro
            </Text>
          </View>

          <TouchableOpacity style={styles.btnClose}></TouchableOpacity>
          <TouchableOpacity style={styles.btnOption}></TouchableOpacity>
        </View>

        <View>
          <LottieView
            source={require('Animaciones/check.json')}
            autoSize
            autoPlay
            style={{width: 200, alignSelf: 'center'}}
          />
          <Text style={{textAlign: 'center', marginTop: 40, fontSize: 20}}>
            Ingresa tus datos {'\n'} y regístrate en Sender
          </Text>
          <Input
            mt={20}
            placeholder={'Nombre de pila'}
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
            value={this.state.password}
            onChangeText={(p) => this.setState({password: p})}
          />

          <TouchableOpacity style={styles.btnSignIn} onPress={this.onSignUp}>
            <Text style={{color: 'white'}}>Registrarme</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect()(Registro);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8F9',
  },
  header: {
    backgroundColor: '#6979F8',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    height: 96,
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
    backgroundColor: '#6979F8',
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
});
