import React from 'react';
import {Text, Image, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {SET} from 'Redux/actions/Usuario';
import {connect} from 'react-redux';
import {ROUTERS} from 'utils/navigation';
import LottieView from 'lottie-react-native';

class ValidarSesion extends React.Component {
  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      let user = await AsyncStorage.getItem('user');
      user = JSON.parse(user);
      this.props.SET(user);
      global.ordering.setAccessToken(token);
      setTimeout(() => {
        this.props.navigation.navigate('Inicio');
      }, 2000);
    } else {
      setTimeout(() => {
        this.props.navigation.navigate(ROUTERS.SignIn);
      }, 2000);
    }
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('imagenes/logo.png')}
          style={{
            marginTop: 20,
            alignSelf: 'center',
            height: 200,
            width: 150,
            resizeMode: 'contain',
          }}></Image>
      </View>
    );
  }
}

const mapearEstado = (state) => {
  return {
    name: state.Usuario.name,
  };
};
const mapearAcciones = (dispatch) => {
  return {
    SET: (data) => {
      dispatch(SET(data));
    },
  };
};

export default connect(mapearEstado, mapearAcciones)(ValidarSesion);
