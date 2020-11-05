import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer, navigationRef, Navigator, ROUTERS, Screen} from "utils/navigation";
import {StackNavigationOptions} from "@react-navigation/stack";
import {connect} from 'react-redux'
// @ts-ignore
import ScalingDrawer from 'react-native-scaling-drawer';
import Walkthroughs from "screens/Walkthroughs";
import ForgotPass from "screens/ForgotPass";
import SignIn from "screens/SiginIn";

import LeftMenu from "Componentes/Menu";
import OrdenDetalle from 'Componentes/OrdenDetalle'
import Inicio from "Componentes/Inicio"
import ValidarSesion from 'Componentes/ValidarSesion'
import Negocio from 'Componentes/Negocio'
import NegocioProductos from 'Componentes/NegocioProductos'
import Producto from 'Componentes/Producto'
import Orden from 'Componentes/Orden'
import Registro from 'Componentes/Registro'
import AgregarUbicacion from 'Componentes/AgregarUbicacion'

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

class MainNavigation extends React.Component {
    
    constructor(props){
        super(props)
        this.state={
            push:''
        }
        
        
    }

    onClose=()=>{
        navigationRef?.current?.closeDrawer()
    }
    onOpen=()=>{
        navigationRef?.current?.openDrawer()
    }
    componentDidMount(){
    }

   
    componentDidUpdate(prev){
    }

    render(){
    return (
        <ScalingDrawer
            content={<LeftMenu onClose={this.onClose} onOpen={this.onOpen}/>}
            {...defaultScalingDrawerConfig}
        >
            <NavigationContainer ref={navigationRef}>
                <Navigator
                    
                    screenOptions={{
                        headerShown: false,
                        gestureEnabled:false
                    }}
                    initialRouteName='ValidarSesion'
                >
                    
                    
                    <Screen name={ROUTERS.ForgotPassword} component={ForgotPass} options={optionNavigator}/>
                    <Screen name={ROUTERS.SignIn} component={SignIn} options={optionNavigator}/>
                    
                    
                    <Screen name='ValidarSesion' component={ValidarSesion} options={optionNavigator}/>
                    <Screen name='Inicio' component={Inicio} options={optionNavigator}/>
                    <Screen name='Negocio' component={Negocio} options={optionNavigator}/>
                    <Screen name='NegocioProductos' component={NegocioProductos} options={optionNavigator}/>
                    <Screen name='Producto' component={Producto} options={optionNavigator}/>
                    <Screen name='Orden' component={Orden} options={optionNavigator}/>
                    <Screen name='Registro' component={Registro} options={optionNavigator}/>
                    <Screen name='AgregarUbicacion' component={AgregarUbicacion} options={optionNavigator}/>
                    <Screen name='OrdenDetalle' component={OrdenDetalle} options={optionNavigator}/>
                </Navigator>
              
            </NavigationContainer>
        </ScalingDrawer>
        
    )
    }
}

const mapearEstadp=state=>{
    return {
        id:state.Usuario.id
    }
}

export default connect(mapearEstadp)(MainNavigation);
