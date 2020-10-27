import React from 'react'
import {View,StyleSheet,StatusBar,Text,TouchableOpacity} from 'react-native'
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {Montserrat} from "utils/fonts";
import SvgOption from "svgs/staticsHealth/SvgOptions";
import NegocioCategorias from './NegocioCategorias'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Cargar} from 'Redux/actions/Negocio'
import {connect} from 'react-redux'
import Cesta from './Cesta'

const Tab = createBottomTabNavigator();

class Negocio extends React.Component{

    componentDidMount(){
        this.props.cargar(this.props.route.params.id)
    }
    componentDidUpdate(){
        
    }

    render(){
        return (<View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'light-content'}/>
            <View style={styles.header}>
                <Text style={styles.title}>{this.props.route.params.name}</Text>
                <TouchableOpacity style={styles.btnClose}>
                    <SvgOption/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnOption}>
                    
                </TouchableOpacity>
            </View>
            <Tab.Navigator  style={{paddingBottom:16,fontSize:24}}>
                <Tab.Screen name='Menú' s component={NegocioCategorias}/>
                <Tab.Screen name='Información' component={NegocioCategorias}/>
                <Tab.Screen name='Opiniones' component={NegocioCategorias}/>
            </Tab.Navigator>
            
        </View>)
    }
}

const mapearEstado=state=>{
    return {
        cargando:state.Negocio.cargando,
        data:state.Negocio.data,
        error:state.Negocio.error,
    }
}

const mapearAcciones=d=>{
    return {
        cargar:(id)=>{
            d(Cargar(id))
        }
    }
}

export default connect(mapearEstado,mapearAcciones)(Negocio)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8F9'
    },
    header: {
        backgroundColor: '#6979F8',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        height: 96,
        paddingTop: getStatusBarHeight(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: Montserrat,
        fontSize: 17,
        color: '#fff'
    },
    btnClose: {
        position: 'absolute',
        bottom: 20,
        left: 16
    },
    btnOption: {
        position: 'absolute',
        bottom: 20,
        right: 16
    },
    containerTime: {
        flexDirection: 'row',
        height: 48,
        margin: 16,
        borderRadius: 24,
        backgroundColor: '#FFF'
    },
    btnTime: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtTime: {
        fontFamily: Montserrat,
        fontSize: 12,
        color: '#1A051D'
    },
    svgHover: {
        position: 'absolute',
        bottom: 0,
        left: 40
    },
    boxStatus: {
        margin: 16,
        backgroundColor: '#FFA26B',
        borderRadius: 16,
        paddingTop: 20,
        paddingLeft: 24,
        paddingBottom: 23
    },
    txtGood: {
        fontSize: 20,
        color: '#FFF',
        fontFamily: Montserrat,
        fontWeight: '500'
    },
    txtKeep: {
        fontSize: 16,
        color: '#FFF',
        fontFamily: Montserrat
    },
    boxHeader: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    containerChart: {
        borderRadius: 16,
        backgroundColor: '#FFF',
        marginHorizontal: 16,
        marginBottom: 16,
        overflow:'hidden'
    },
    boxContent:{
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    txtTitle: {
        marginLeft: 8,
        fontFamily: Montserrat,
        fontSize: 14,
        color: '#1A051D',
        flex: 1
    },
    line: {
        height: 1,
        backgroundColor: '#F7F8F9',
        borderRadius: 16
    },
    boxBottom: {
        flexDirection: 'row'
    },
    btnBottom: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12
    },
    txtBtnBottom: {
        fontSize: 14,
        color: '#ABA4AC',
        fontFamily: Montserrat
    },
    txtBtnBottomActive: {
        fontSize: 14,
        color: '#0084F4',
        fontFamily: Montserrat
    },
    lineVertical: {
        width: 1,
        backgroundColor: '#F7F8F9',
        borderRadius: 16
    }
});
