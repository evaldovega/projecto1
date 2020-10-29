import React from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import {Lato} from 'utils/fonts'
import {connect} from 'react-redux'
import {cargarCarrito} from 'Redux/actions/Carrito'

class Cesta extends React.Component{
    state={
        total_productos:0
    }
    componentDidMount(){
        console.log("Mostrar la cesta de ",this.props.negocio)
    }
    componentDidUpdate(prev){
        if(prev.negocio!=this.props.negocio && this.props.productos.length==0){
            this.props.cargarCarrito(this.props.negocio)
        }
    }

    ver=()=>{
        console.log("Ver cesta")
        this.props.navigation.push('Orden',{negocio:this.props.negocio})
    }
    
    render(){
        return (
            <TouchableOpacity onPress={this.ver}>
                <View style={{width:32,height:32,justifyContent:'center',alignItems:'center'}} >
                    <Icon name='shopping-cart' color='#ffff' size={24}/>
                    <View style={{width:32,height:32,position:'absolute',top:-16,right:-16,borderRadius:16,flexDirection:'column',backgroundColor:'#B03A2E',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{color:'#ffff',fontWeight:'bold',fontFamily:Lato}}>{this.props.productos.length}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}


const mapearEstado=state=>{
    return {
        orden_id:state.Carrito.orden_id,
        productos:state.Carrito.productos
    }
}
const mapearAcciones=dispatch=>{
    return {
        cargarCarrito:(negocio)=>{
            dispatch(cargarCarrito(negocio))
        }
    }
}
export default connect(mapearEstado,mapearAcciones)(Cesta)