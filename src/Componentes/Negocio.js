import React from 'react'
import {View,StyleSheet,StatusBar,Text,TouchableOpacity,Image,ScrollView} from 'react-native'
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {Montserrat} from "utils/fonts";
import NegocioCategorias from './NegocioCategorias'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Cargar} from 'Redux/actions/Negocio'
import {connect} from 'react-redux'
import Cesta from './Cesta'
import { COLOR_BG_TAPBAR, COLOR_PRIMARY } from 'Constantes';
import {Icon} from 'react-native-elements'
import TabBarNegocio from 'Componentes/TabBarNegocio'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const dias=['Domingo','Sabado','Viernes','Jueves','Miercoles','Martes','Lunes']
class Negocio extends React.Component{

    constructor(props){
        super(props)
        this.state={
            mostrar:1
        }
    }
    componentDidMount(){
        this.props.cargar(this.props.route.params.id)
        //console.log(this.props.route.params)
    }
    
    componentDidUpdate(){
        try{
        //console.log(this.props.data.schedule[0].lapses)
        }catch(error){}
    }

    renderHorarios=()=>{
        if(!this.props.data){
            return
        }
        if(!this.props.data.schedule){
            return
        }
        return this.props.data.schedule.map((s,i)=>{
            return (
                <View style={{flexDirection:'row',padding:8,justifyContent:'space-between'}}>
                    <Text style={{fontSize:16}}>{dias[i]}</Text>
                    {s.lapses.map((l,i)=>{
                        let keys=Object.keys(l)
                        console.log("KEYS ",Object.keys(l),i)
                        const horario= keys.map((k,_i)=>{
                        return <Text style={{fontSize:16}}>{l[k].hour}:{l[k].minute} {_i==0 ? '-':''}</Text>
                        })
                        return (<View style={{flexDirection:'row'}}>{horario}</View>)
                    })}
                </View>
            )
        })
        
    }

    

    render(){
        return (<View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'light-content'}/>
            <View style={[styles.header,{position:'relative'}]}>
                <Image style={{position:'absolute',width:'100%',height:undefined,aspectRatio:16/9}} source={{uri:this.props.route.params.header}}/>
                <View style={{backgroundColor:COLOR_PRIMARY,position:'absolute',opacity:.6,width:'100%',height:96}}></View>
                <Text style={styles.title}>{this.props.route.params.name}</Text>
                <TouchableOpacity style={styles.btnClose} onPress={()=>this.props.navigation.pop()}>
                    <Icon name='chevron-back' type='ionicon' color='#ffff' size={24}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnOption}>
                    
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:COLOR_BG_TAPBAR,borderRadius:32,marginHorizontal:16,overflow:'hidden',marginVertical:16}}>
                <TouchableOpacity style={[styles.botonTab,(this.state.mostrar==1 ? {backgroundColor:COLOR_PRIMARY}:{})]} onPress={()=>this.setState({mostrar:1})}>
                    <Text style={styles.textTab,(this.state.mostrar==1 ? {color:'#ffff'}:{})}>Menú</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.botonTab,(this.state.mostrar==2 ? {backgroundColor:COLOR_PRIMARY}:{})]} onPress={()=>this.setState({mostrar:2})}>
                    <Text style={styles.textTab,(this.state.mostrar==2 ? {color:'#ffff'}:{})}>Info</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.botonTab,(this.state.mostrar==3 ? {backgroundColor:COLOR_PRIMARY}:{})]} onPress={()=>this.setState({mostrar:3})}>
                    <Text style={[styles.textTab,(this.state.mostrar==3 ? {color:'#ffff'}:{})]}>Opiniones</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex:1}}>
                <ScrollView>
                {this.state.mostrar==1 && <NegocioCategorias navigation={this.props.navigation} />}
                {this.state.mostrar==2 && <>
                    <View style={{padding:16}}>
                    <Text style={{marginVertical:8}}>{this.props.data.description}</Text>
                        <View style={{elevation:1,borderRadius:32,padding:16,marginVertical:32}}>
                            <Text style={{backgroundColor:COLOR_BG_TAPBAR,padding:16,fontSize:18,fontWeight:'100',borderRadius:16,marginTop:-32}}>Horarios de atención</Text>
                            {this.renderHorarios()}
                        </View>
                        <View style={{elevation:1,borderRadius:32,padding:16,marginVertical:32}}>
                            <Text style={{backgroundColor:COLOR_BG_TAPBAR,padding:16,fontSize:18,fontWeight:'100',borderRadius:16,marginTop:-32}}>Localización</Text>
                            <View style={{height: 400,
                                    width: '100%',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center'}}>
                            <MapView
                                mapType='none'
                                type='satellite'
                                initialRegion={{
                                    
                                latitude: -74.8128827,
                                longitude: 11.0140506,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                                }}
                                style={{...StyleSheet.absoluteFillObject}}
                            ></MapView>
                            </View>
                            <Text style={{fontSize:16}}>{this.props.data.address_notes}, {this.props.data.address}</Text>
                            
                        </View>
                        
                    </View>
                    
                </>}
                </ScrollView>
            </View>
            
            <TabBarNegocio {...this.props}/>
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
    botonTab:{
        flex:1,
        padding:16,
        borderRadius:32,
        alignItems:'center'
    }, 
    textTab:{
        textAlign:'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#F7F8F9'
    },
    header: {
        backgroundColor: COLOR_PRIMARY,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        height: 96,
        overflow:'hidden',
        paddingTop: getStatusBarHeight(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: Montserrat,
        fontSize: 17,
        color: '#fff',
        fontWeight:'bold',
        textTransform:'uppercase'
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
