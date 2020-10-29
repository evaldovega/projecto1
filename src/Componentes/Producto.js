import { COLOR_PRIMARY } from 'Constantes'
import React from 'react'
import { Image,View,ScrollView,TextInput, Alert,TouchableWithoutFeedback,KeyboardAvoidingView, Keyboard,Platform} from 'react-native'
import { ListItem,CheckBox,Input,Button,Text} from 'react-native-elements'
import NotificationPopup from 'react-native-push-notification-popup';
import Icon from 'react-native-vector-icons/FontAwesome';
import CurrencyFormat from 'react-currency-format';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux'
import {cargarCarrito,setCantidad,borrarProducto,ingresarInstrucciones} from 'Redux/actions/Carrito'

const icono=require('imagenes/logo.png')
const TIMEOUT_UPDATE_LOCAL=200

class Producto extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            opacidad:0,
            orden_id:'',
            data:{
                id:'',
                comment:'',
                quantity:'0',
                price:0,
                options:[],
                ingredients:[]
            }
        }
    }

    componentDidMount(){
        this.setState(state=>{
            let data=state
            data.negocio_id=this.props.route.params.negocio_id
            data.id=this.props.route.params.producto.id
            data.name=this.props.route.params.producto.name
            data.price=this.props.route.params.producto.price
            data.images=this.props.route.params.producto.images
            data.descripcion=this.props.route.params.producto.descripcion
            data.ingredients=this.props.route.params.producto.ingredients
            data.extras=this.props.route.params.producto.extras
            data.data.id=this.props.route.params.producto.id
            data.data.price=this.props.route.params.producto.price
            return {...data}
        })
        //Crear u Obtener una orden localmente
        global.BD.find({selector: {negocio_id:this.state.negocio_id}}).then(result=>{
            if(result.docs.length>0){
                const orden=result.docs[0]
                if(orden.productos){
                    const producto=orden.productos.find(p=>p.id==this.state.id)
                    if(producto && producto.cantidad){
                        this.setState(state=>{
                            state.data.quantity=producto.cantidad
                            state.data.comment=producto.comentarios
                            state.data.ingredients=producto.ingredientes
                            return {...state}
                        })
                    }
                }
                
                this.setState({orden_id:orden._id})
            }else{
                global.BD.post({negocio_id:this.state.negocio_id}).then(e=>{
                    this.setState({orden_id:e._id})
                })
            }
        })
    }

    //----------BD local

    actualizarLocal=(props)=>{
        global.BD.upsert(this.state.orden_id,(doc)=>{
            let nuevo_doc={
                id:this.state.id,
                cantidad:this.state.data.quantity,
                comentarios:this.state.data.comment,
                ingredientes:this.state.data.ingredients,
                opciones:this.state.data.options
            }
            console.log("Nuevo doc ",nuevo_doc)
            if(!doc.productos){
                console.log("Crear array productos")
                doc.productos=[nuevo_doc]
            }else{
                let producto=doc.productos.findIndex(p=>p.id==this.state.id)
                if(producto>-1){
                    console.log("Inc prodcucto")
                    doc.productos[producto]=nuevo_doc
                }else{
                    doc.productos.push(nuevo_doc)
                }
            }
            return doc
        })
    }

    borrarProducto=()=>{
        global.BD.upsert(this.state.orden_id,(doc)=>{
            let index=doc.productos.findIndex(p=>p.id==this.state.id)
            if(index>=0){
                console.log("Borrar")
                doc.productos.splice(index,1)
            }else{
                console.log("No borrado ",index)
            }
            return doc
        }).then(()=>{

        })
    }
    //------------Fin BD local

    //--------------------Ingredientes
    ingredienteAgregado=(id)=>{
        if(this.state.data.ingredients){
            return this.state.data.ingredients.includes(id)
        }
        return false
    }
    agregarIngrediente=(id)=>{
        this.setState(state=>{
            let existe=state.data.ingredients.findIndex(i=>i==id)
            if(existe==-1){
                state.data.ingredients.push(id)
            }else{
                state.data.ingredients.splice(existe,1)
            }
            return {...state}
        })
        setTimeout(()=>{this.actualizarLocal()},TIMEOUT_UPDATE_LOCAL)
    }
    ingredientes=()=>{
        if(this.state.ingredients){
            let _ingredientes=this.state.ingredients.map(i=>{
                return (<CheckBox checkedIcon='dot-circle-o' uncheckedIcon='circle-o' title={i.name} checked={this.ingredienteAgregado(i.id)} onPress={()=>this.agregarIngrediente(i.id)}/>)
            })
            return (
                <View>
                    <Text h5>Ingredientes</Text>
                    {_ingredientes}
                </View>
            )
        }
    }

    extras=()=>{
        if(this.state.extras){
            return this.state.extras.map(e=>{
                return (
                    <>
                        {e.options.map(o=>{
                            return (
                            <View>
                                <Text h5>{o.name} (Min. {o.min} Max. {o.max})</Text>
                                {o.suboptions.map(_o=>(  
                                   <CheckBox  style={{flex:1}} checkedIcon='dot-circle-o' uncheckedIcon='circle-o' title={_o.name} />
                                ))}
                            </View>
                        )}
                        )}
                    </>
                )
            })
        }
    }

    plus=()=>{
        this.setState(state=>{
            state.data.quantity=parseInt(state.data.quantity)+1
            return {...state}
        })
        setTimeout(()=>{this.actualizarLocal()},300)
        
    }

    minus=()=>{
        this.setState(state=>{
            if(parseInt(state.data.quantity)-1>-1){
                state.data.quantity=parseInt(state.data.quantity)-1
            }
            return {...state}
        })

        setTimeout(()=>{
            if(this.state.data.quantity==0){
                this.borrarProducto()
            }else{
                this.actualizarLocal()
            }
        },500)
        
    }


    render(){
        
        return (
            <View style={{flex:1,backgroundColor:'#ffff'}}>
                <View style={{position:'absolute',height:200,width:'100%'}}>
                    {this.state.images ? <Image style={{width:'100%',height:undefined,aspectRatio:16/9}} source={{uri:this.state.images}}/> : <></>}
                    <View style={{width:'100%',height:200,backgroundColor:'#000',position:'absolute',opacity:this.state.opacidad}}></View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{flex:1,backgroundColor:'#ffff',borderTopLeftRadius:16,borderTopRightRadius:16,padding:16,marginTop:200,elevation:3}}>
                        <Text h3 style={{color:COLOR_PRIMARY}}>{this.state.name || '...'}</Text>
                        {this.ingredientes()}
                        {this.extras()}
                        <Text>Instrucciones Especiales</Text>
                        <TextInput multiline={true}  numberOfLines={4} underlineColorAndroid='#ffff' style={{borderColor:'silver',borderWidth:1,borderRadius:16}}/>
                    </View>
                </ScrollView>
                <LinearGradient colors={['#fff', '#BFC9CA']} style={{height:100,width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:16}} >
                    
                        <View style={{flexDirection:'row'}}>
                            <Button icon={<Icon name='minus' color='#ffff' size={24}/>} onPress={this.minus} buttonStyle={{borderRadius:32,backgroundColor:COLOR_PRIMARY}}></Button>
                            <Text h4 style={{marginHorizontal:16}}>{this.state.data.quantity}</Text>
                            <Button icon={<Icon name='plus' color='#ffff' size={24}/>} backgroundColor={COLOR_PRIMARY} onPress={this.plus} buttonStyle={{borderRadius:32,backgroundColor:COLOR_PRIMARY}}></Button>
                        </View>
                        <CurrencyFormat value={9} displayType={'text'} thousandSeparator={true}   prefix={'$'} renderText={value => <Text h5>{value}</Text>} />

            </LinearGradient>
            </View>
        )
    }
}

const mapearEstado=state=>{
    return {
        data:state.Negocio.data,
        productos:state.Carrito.productos,
        carrito_cargado:state.Carrito.carrito_cargado
    }
}
const mapearAcciones=dispatch=>{
    return {
        cargarCarrito:(negocio)=>{
            dispatch(cargarCarrito(negocio))
        },
        setCantidad:(producto,cantidad)=>{
            dispatch(setCantidad(producto,cantidad))
        },
        borrarProducto:(producto_id)=>{
            dispatch(borrarProducto(producto_id))
        },
        ingresarInstrucciones:(producto,instrucciones)=>{
            dispatch(ingresarInstrucciones(producto,instrucciones))
        }
    }
}
export default connect(mapearEstado,mapearAcciones)(Producto)