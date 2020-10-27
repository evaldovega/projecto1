import 'react-native-gesture-handler';
import React, {createRef, memo, useCallback, useRef} from 'react';
import {NavigationContainer, navigationRef, Navigator, ROUTERS, Screen} from "utils/navigation";
import {StackNavigationOptions} from "@react-navigation/stack";
// @ts-ignore
import ScalingDrawer from 'react-native-scaling-drawer';
import Walkthroughs from "screens/Walkthroughs";
import ForgotPass from "screens/ForgotPass";
import SignIn from "screens/SiginIn";

import Profile from "screens/Profile";
import Notification from "screens/Notification";
import LeftMenu from "Componentes/Menu";

import Inicio from "Componentes/Inicio"
import ValidarSesion from 'Componentes/ValidarSesion'
import Negocio from 'Componentes/Negocio'
import NegocioProductos from 'Componentes/NegocioProductos'
import Producto from 'Componentes/Producto'

import {Platform} from "react-native";

import {Provider} from 'react-redux';
import configureStore from 'Redux/configuracion';
const store = configureStore();


const optionNavigator: any = {
    headerShown: false,
    gesturesEnabled: false,
};
const defaultScalingDrawerConfig = {
    scalingFactor: 0.8,
    minimizeFactor: 0.8,
    swipeOffset: 30,
    frontStyle: {
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowColor: '#FFF',
        shadowOpacity: 0,
        shadowRadius: 0,
    }
};


const MainNavigation = memo(() => {
    const drawer = useRef();
    const onClose = useCallback(() => {
        // @ts-ignore
        drawer.current?.close();
    }, []);
    const onOpen = useCallback(() => {
        // @ts-ignore
        drawer.current?.open();
    }, []);

    return (
        <Provider store={store}>  
        <ScalingDrawer
            ref={drawer}
            content={<LeftMenu onClose={onClose} onOpen={onOpen}/>}
            {...defaultScalingDrawerConfig}
        >
            <NavigationContainer
                // @ts-ignore
                >
                <Navigator
                    screenOptions={{
                        headerShown: false,
                        gestureEnabled:false
                    }}
                    ref={navigationRef}
                    initialRouteName='ValidarSesion'
                >
                    
                    
                    <Screen name={ROUTERS.ForgotPassword} component={ForgotPass} options={optionNavigator}/>
                    <Screen name={ROUTERS.SignIn} component={SignIn} options={optionNavigator}/>
                    
                    
                    <Screen name='ValidarSesion' component={ValidarSesion} options={optionNavigator}/>
                    <Screen name='Inicio' component={Inicio} options={optionNavigator}/>
                    <Screen name='Negocio' component={Negocio} options={optionNavigator}/>
                    <Screen name='NegocioProductos' component={NegocioProductos} options={optionNavigator}/>
                    <Screen name='Producto' component={Producto} options={optionNavigator}/>
                </Navigator>
              
            </NavigationContainer>
        </ScalingDrawer>
        </Provider>
    );
});

export default MainNavigation;
