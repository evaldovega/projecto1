import React from 'react';
import {Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {SET} from 'Redux/actions/Usuario';
import SplashScreen from 'react-native-splash-screen';
import {connect} from 'react-redux';
import {ROUTERS} from 'utils/navigation';

class ValidarSesion extends React.Component {
  async componentDidMount() {
    SplashScreen.hide();
    const token = await AsyncStorage.getItem('token');
    if (token) {
      let user = await AsyncStorage.getItem('user');
      user = JSON.parse(user);
      this.props.SET(user);
      global.ordering.setAccessToken(token);
      this.props.navigation.navigate('Registro');
    } else {
      this.props.navigation.navigate(ROUTERS.SignIn);
    }
  }
  render() {
    return <Text>...</Text>;
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
