import React from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  COLOR_ACCENT,
  COLOR_PRIMARY,
  COLOR_TEXT,
  COLOR_BG_TAPBAR,
  COLOR_BG,
  COLOR_DESATIVADO,
} from 'Constantes';
/*
import Svg,{ Circle, Path } from 'react-native-svg';
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);
*/
class TabBar extends React.Component {
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
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity>
            <Icon
              name="receipt"
              type="font-awesome-5"
              size={32}
              color={COLOR_DESATIVADO}
            />
          </TouchableOpacity>
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
              <Icon
                name="home"
                type="font-awesome"
                size={30}
                color="#ffff"
                onPress={() => this.props.navigation.navigate('Inicio')}
              />
            </View>
          </View>
          <TouchableOpacity>
            <Icon
              name="account-circle"
              type="material-community"
              size={32}
              color={COLOR_DESATIVADO}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default TabBar;
