import React from 'react'
import {connect} from 'react-redux'
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {Avatar,Button} from 'react-native-elements'
import {View,Image,StyleSheet,Text,TouchableOpacity,StatusBar,SafeAreaView,FlatList} from 'react-native'
import {Montserrat} from "utils/fonts";
import SvgOption from "svgs/staticsHealth/SvgOptions";
import { ScrollView } from 'react-native-gesture-handler';
import Cesta from './Cesta'
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLOR_PRIMARY} from 'Constantes'
class NegocioProductos extends React.Component{
    
    state={
        categoria:{}
    }

    componentDidMount(){
        let productos=this.props.data.categories.find(c=>c.id==this.props.route.params.categoria.id).products
       
        this.setState({productos:productos,nombre_categoria:this.props.route.params.categoria.name})
        
    }

    renderItem=({item})=>(
        
            <View style={[styles.card,{flex:1,justifyContent:'center',flexDirection:'column'}]}>
                <TouchableOpacity onPress={()=>this.props.navigation.push('Producto',{producto:item})}>
                <Avatar rounded size={128} source={{uri:item.images}}/>
                <View style={styles.card_content}>
                    <Text style={{fontSize: 16,fontFamily: Montserrat}}>{item.name}</Text>
                    <Text>$ {item.price}</Text>
                </View>
                </TouchableOpacity>
            </View>
        
    )
    
    render(){
        return (<View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'light-content'}/>
            <View style={styles.header}>
                <Text style={styles.title}>{this.state.nombre_categoria}</Text>
                <TouchableOpacity style={styles.btnClose} onPress={()=>this.props.navigation.pop()}>
                    <SvgOption/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnOption}>
                    
                </TouchableOpacity>
            </View>
            <SafeAreaView style={{flex:1}}>
                <FlatList
                data={this.state.productos}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                />
            </SafeAreaView>
        </View>)
    }
}

const mapearEstado=state=>{
    return {
        data:state.Negocio.data
    }
}
export default connect(mapearEstado)(NegocioProductos)

const styles=StyleSheet.create({
    card:{
        borderRadius: 16,
        backgroundColor: '#FFF',
        marginHorizontal: 16,
        marginTop: 16,
        overflow:'hidden'
    },
    card_content:{
        padding:16
    },
    card_bottom: {
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
    line: {
        height: 1,
        backgroundColor: '#F7F8F9',
        borderRadius: 16
    },
    lineVertical: {
        width: 1,
        backgroundColor: '#F7F8F9',
        borderRadius: 16
    },
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
})