import React from 'react'
import {View,Text,TouchableOpacity,SafeAreaView,ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import {Lato} from 'utils/fonts'
import {Divider,ListItem, Avatar,Button} from 'react-native-elements'
import { COLOR_PRIMARY } from 'Constantes';
import {connect} from 'react-redux'
import {cargarCarrito,borrarProducto} from 'Redux/actions/Carrito'

class Orden extends React.Component{
    state={
        orden:{}
    }

    componentDidMount(){
        this.props.cargarCarrito(this.props.route.params.negocio)
    }

    componentDidUpdate(prev){
       
    }

   

    renderProductos=()=>{
        return this.props.productos.map(p=>{
            return (<ListItem>
                <Avatar/>
                <ListItem.Content>
                    <ListItem.Title>{p.name} {p.quantity}</ListItem.Title>
                </ListItem.Content>
                <Button buttonStyle={{backgroundColor:COLOR_PRIMARY}} icon={<Icon name='pencil' color='#ffff'/>}/>
                <Button buttonStyle={{backgroundColor:'red'}} onPress={()=>this.props.borrarProducto(p.id)} icon={<Icon name='trash' color='#ffff'/>}/>
            </ListItem>)
        })
    }

    render(){
        return (<SafeAreaView style={{flex:1}}>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity>
                    <Icon name='times'/>
                </TouchableOpacity>
            </View>
            <ScrollView>
                {this.renderProductos()}
            </ScrollView>
        </SafeAreaView>)
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
        },
        borrarProducto:(producto_id)=>{
            dispatch(borrarProducto(producto_id))
        }
    }
}
export default connect(mapearEstado,mapearAcciones)(Orden)