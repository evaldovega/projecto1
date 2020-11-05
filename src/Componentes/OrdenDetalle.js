import React from 'react'
import {StatusBar,View,StyleSheet,TouchableOpacity, Alert,Dimensions,KeyboardAvoidingView,Keyboard,Platform} from 'react-native'
import { Text,Icon,ListItem,Badge, Input,Button,BottomSheet,Header,Image} from 'react-native-elements'
import {COLOR_BG_TAPBAR,COLOR_BG, COLOR_PRIMARY,COLOR_DESATIVADO,COLOR_TEXT, API_PROJECT_NAME, COLOR_ACCENT} from 'Constantes';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import CurrencyFormat from 'react-currency-format';
import {Montserrat} from 'utils/fonts';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import {connect} from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import ImagePicker from 'react-native-image-crop-picker';
import SocketIOClient from 'socket.io-client/dist/socket.io.js';
import axios from 'axios'

const {height,width}=Dimensions.get("screen")
const ESTADO=[
    'Pendiente',
    'Completada',
    'Anulada',
    'El conductor esta esperando en el negocio',
    'Preparación completada',
    'El negocio ha rechazado el pedido',
    'Pedido rechazado por el conductor',
    'Pedido aceptado por el negocio',
    'Pedido aceptado por el conductor',
    'El conductor ha llegado al negocio',
    'El pedido no se puede recoger',
    'Pedido entregado',
    'Pedido fallido'
]
const scroll_msn=React.createRef(null)
class OrdenDetalle extends React.Component{
    constructor(props){
        super(props)
        this.state={
            tab:1,
            total:0,
            mostrar_opciones_camara:false,
            orden:null,
            mensajes:null,
            token:'',
            enviando_mensaje:false,
            comentario:''
        }
    }
    componentDidMount(){
       this.conectarSocket()
       this.cargar()
       this.cargarMensajes()
    }

    conectarSocket=async ()=>{
        let token=await AsyncStorage.getItem("token")
        let socket = SocketIOClient('https://socket.ordering.co/', {
            extraHeaders: {
                Authorization: "Bearer "+token,
            },
            query: "token="+token+"&project="+API_PROJECT_NAME
        });

        socket.on('connect',  ()=>{
            console.log("Conectado al socket")
            socket.emit('join',API_PROJECT_NAME+'_orders_'+this.props.id)
            socket.emit('join',API_PROJECT_NAME+'_messages_orders_'+this.props.id)
        })
        socket.on('update_order',function(order){
            console.log("Orden actualizada ",order)
        })
        socket.on('message',(m)=>{
            console.log("Nuevo mensaje ",m.order_id," esto en ",this.props.route.params.id)
            if(parseInt(m.order_id)==parseInt(this.props.route.params.id) && m.author_id!=this.props.id){
                this.setState(state=>{
                    state.mensajes.push({
                        comment:m.comment,
                        author:m.author,
                        author_id:m.author_id,
                        type:m.type,
                        source:m.source
                    })
                    
                    return {...state}
                })
               setTimeout(()=>{
                scroll_msn.current?.scrollToEnd({animated: true})
               },200)
            }
        })
    }

    cargar=async ()=>{

        const token=await AsyncStorage.getItem('token')
        this.setState({token:token})
        let req=await global.ordering.orders(this.props.route.params.id).get()

        let data=req.response.data
        if(data.error){
            Alert.alert('Algo anda mal',data.result.join('\n'))
            this.props.navigation.pop()
            return
        }
        this.setState({orden:data.result})
        let total=0
        this.state.orden.products.forEach(p=>{
            total+=(p.price*p.quantity)
            p.options.forEach(op=>{
                op.suboptions.forEach((sop=>{
                    if(sop.price>0){
                        total+=sop.price
                    }
                }))
            })
        })
        this.setState({total:total})

        
    }

    accionCamara=(a)=>{
        this.setState({mostrar_opciones_camara:false})
        if(a==1){
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
                mediaType: 'photo',
                compressImageQuality: 0.6,
                includeBase64:true
            }).then(image => {
                this.enviarComentario(3,`data:${image.mime};base64,${image.data}`)
            });
        }else{
            ImagePicker.openPicker({
                width: 200,
                height: 200,
                cropping: true,
                includeBase64:true,
                mediaType: 'photo',
                compressImageQuality: 0.6
            }).then(image => {
                this.enviarComentario(3,`data:${image.mime};base64,${image.data}`)
            });
        }
    }

   

    enviarComentario=async (tipo,file=null)=>{
        
        
        if(!this.state.enviando_mensaje){
            this.setState({enviando_mensaje:true})
           
            let data={
                order_id:this.props.route.params.id,
                type:tipo,
                can_see:'0,2,3,4'
            }
            data.comment=this.state.comentario

            if(tipo==2){
                if(this.state.comentario==''){
                    this.setState({enviando_mensaje:false})
                    return
                }
            }else if(tipo==3){
                data.file=file
            }

            try{
                global.ordering.post("/orders/"+this.props.route.params.id+"/messages", data).then(r => {
                    if(r.response.data.error){
                        Alert.alert("No se pudo subir el archivo",r.response.data.result.join("\n"))
                    }else{
                        const m=r.response.data.result
                        this.setState(state=>{
                            state.mensajes.push({
                                comment:m.comment,
                                author:m.author,
                                author_id:m.author_id,
                                type:m.type,
                                source:m.source
                            })
                            state.comentario=''
                            return {...state}
                        })
                    }
                    this.setState({enviando_mensaje:false})
                    setTimeout(()=>{
                        scroll_msn.current?.scrollToEnd({animated: true})
                    },200)
                })
            }catch(error){
                console.error(err);
                this.setState({enviando_mensaje:false})
            }
        }
    }

    cargarMensajes=async ()=>{
        const token=await AsyncStorage.getItem('token')
        fetch("https://apiv4.ordering.co/v400/es/"+API_PROJECT_NAME+"/orders/"+this.props.route.params.id+"/messages", {
        "method": "GET",
        "headers": {
            'Authorization':'Bearer '+this.state.token
        }
        })
        .then(r=>r.json())
        .then(response => {
            this.setState({mensajes:response.result})
            setTimeout(()=>{
                scroll_msn.current?.scrollToEnd({animated: true})
            },1000)
        })
        .catch(err => {
        console.error(err);
        });
    }

    renderComentario=(m)=>{
        if(m.type==2){
            return (<View style={{padding:16,backgroundColor:(this.props.id!=m.author_id) ? COLOR_PRIMARY: COLOR_ACCENT,margin:8,borderRadius:16,alignSelf:(this.props.id==m.author_id) ? 'flex-end':'flex-start'}}>
                {(this.props.id!=m.author_id) ? <Text style={{color:'#ffff',fontWeight:'bold',fontSize:12}}>{m.author.name}</Text> : <></>}
                <Text style={{color:'#ffff',fontSize:14}}>{m.comment}</Text>
            </View>)
        }else if(m.type==3 && m.source && m.source!=''){
            return (<View style={{padding:16,backgroundColor:(this.props.id!=m.author_id) ? COLOR_PRIMARY: COLOR_ACCENT,margin:8,borderRadius:16,alignSelf:(this.props.id==m.author_id) ? 'flex-end':'flex-start'}}>
                {(this.props.id!=m.author_id) ? <Text style={{color:'#ffff',fontWeight:'bold',fontSize:12}}>{m.author.name}</Text> : <></>}
                <Image style={{width:'100%',aspectRatio:4/3,height:undefined}} source={{uri:m.source}}/>
                <Text style={{color:'#ffff',fontSize:14}}>{m.comment}</Text>
            </View>)
        }
    }

    renderMensajes=()=>{
        if(!this.state.mensajes){
            return
        }
        return this.state.mensajes.map(m=>{
            return (<>
                    {this.renderComentario(m)}
            </>)
        })
    }

    renderNegocio=()=>{
        if(!this.state.orden){
            return
        }
        return (<><Text style={{
            fontSize: 32,
            color: COLOR_DESATIVADO,
            textAlign: 'center',
            marginVertical: 8,
          }}>{this.state.orden.business.name}</Text>
            <Text style={{
            fontSize: 18,
            color: COLOR_PRIMARY,
            textAlign: 'center',
            marginVertical: 8,
          }}>{ESTADO[this.state.orden.status]}</Text>
          </>)
    }

    renderTotal=()=>{
        if(!this.state.orden){
           return
        }
        return (<View
            style={{
              marginTop: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 24, color: COLOR_TEXT}}>
              Total parcial
            </Text>
            <CurrencyFormat
                value={this.state.total}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                renderText={(v) => (
                  <Text
                    style={{
                      fontSize: 24,
                      color: COLOR_PRIMARY,
                      textAlign: 'right',
                    }}>
                    {v}
                  </Text>
                )}
              />
            </View>)
    }

    renderProductos=()=>{
        
        if(!this.state.orden){
            return
        }
        return this.state.orden.products.map((p) => {
            let total=p.quantity * p.price
            return (
              <ListItem bottomDivider>
                <Text style={{fontSize: 18}}>{p.quantity}</Text>
                <ListItem.Content>
                  <ListItem.Title>{p.name} </ListItem.Title>
                  
                  <View style={{flexDirection:'row'}}>
                    {p.ingredients.map((i)=>{
                        return (<Badge status="success" value={i.name}/>)
                    })}
                  </View>
                  {p.options.map((op)=>{
                     return (<View style={{marginTop:8}}>
                        <Text>{op.name}</Text>
                        <View style={{flexDirection:'row',marginTop:8}}>
                            {op.suboptions.map((sop)=>{
                                let s=sop.name
                                if(parseFloat(sop.price)>0){
                                    s+=' $ '+sop.price
                                    total+=sop.price
                                }
                                return (<Badge status='success' value={s}/>)
                            })}
                        </View>
                      </View>)
                  })}
                  <CurrencyFormat
                    value={total}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                    renderText={(v) => (
                      <Text style={{color: COLOR_PRIMARY, fontSize: 20}}>{v}</Text>
                    )}
                  />
                </ListItem.Content>
              </ListItem>
            );
          });

    }

    cambiarTab=()=>{
        this.setState({tab:(this.state.tab==1)?2:1})
    }
    

    render(){
        return (<View style={{flex:1,backgroundColor:'#ffff'}}>
            <StatusBar
              translucent={true}
              backgroundColor={'transparent'}
              barStyle={'light-content'}
            />
            <View style={[styles.header, {position: 'relative',elevation:4}]}>
              <View
                style={{
                  backgroundColor: COLOR_PRIMARY,
                  position: 'absolute',
                  opacity: 0.6,
                  width: '100%',
                  height: 96,
                }}></View>
              <Text style={styles.title}>Orden {this.props.route.params.id}</Text>
              <TouchableOpacity
                style={styles.btnClose}
                onPress={() => this.props.navigation.pop()}>
                <Icon name="chevron-back" type="ionicon" color="#ffff" size={24} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnOption}></TouchableOpacity>
            </View>
                <View style={{flexDirection:'row',justifyContent:'center',padding:8,paddingTop:24,zIndex:9999,backgroundColor:'#ffff'}}>
                    <TouchableOpacity onPress={()=>this.setState({tab:1})} style={{flex:1,borderBottomColor:(this.state.tab==1 ? COLOR_PRIMARY:'#ffff'),borderBottomWidth:2}}>
                        <Text style={{fontSize:18,textAlign:'center',paddingBottom:8}}>Pedido</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.setState({tab:2})} style={{flex:1,borderBottomWidth:2,borderBottomColor:(this.state.tab==2 ? COLOR_PRIMARY:'#ffff')}}>
                        <Text style={{fontSize:18,textAlign:'center',paddingBottom:8}}>Mensajes</Text>
                    </TouchableOpacity>
                </View>
                    
                        <View style={{position:'absolute',height:(height-150),width:width,marginTop:150,opacity:this.state.tab==1 ? 1:0}}>
                            
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {this.renderNegocio()}
                            {this.renderProductos()}
                            <View style={{paddingHorizontal: 42}}>
                                {this.renderTotal()}
                            </View>
                            </ScrollView>
                        </View>
                    

                   
                        <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                        style={{position:'absolute',height:(height-150),width:width,marginTop:150,opacity:this.state.tab==2 ? 1:0}}
                        >
                            <ScrollView ref={scroll_msn} style={{flex:1}} showsVerticalScrollIndicator={false}>{this.renderMensajes()}</ScrollView>
                            <View style={{borderTopRightRadius:24,borderTopLeftRadius:24,elevation:3,flexDirection:'row',padding:16,justifyContent:'space-around',alignItems:'center',backgroundColor:COLOR_BG_TAPBAR}}>
                                <Input disabled={this.state.enviando_mensaje} placeholder='Escribe aquí...' multiline={true} containerStyle={{flex:1}} value={this.state.comentario} onChangeText={(t)=>this.setState({comentario:t})}/>
                                <Button disabled={this.state.enviando_mensaje} buttonStyle={{backgroundColor:COLOR_PRIMARY,marginRight:8}} onPress={()=>this.enviarComentario(2)} icon={<Icon name='paper-plane' type="font-awesome" color='#ffff' size={24} />} title='' />
                                <Button disabled={this.state.enviando_mensaje} buttonStyle={{backgroundColor:COLOR_PRIMARY}} icon={<Icon name='image' color='#ffff' type="font-awesome" size={24} />} onPress={()=>this.setState({mostrar_opciones_camara:true})} title='' />
                            </View>
                            <BottomSheet isVisible={this.state.mostrar_opciones_camara}>
                                <Header containerStyle={{backgroundColor:'#ffff'}} 
                                centerComponent={{ text: 'Selecione', style: { color: COLOR_PRIMARY} }}
                                rightComponent={{ icon: 'close', color: COLOR_PRIMARY,onPress:()=>{this.setState({mostrar_opciones_camara:false})} }}
                                />
                                <ListItem onPress={()=>this.accionCamara(1)}>
                                    <ListItem.Content>
                                    <ListItem.Title>Tomar foto</ListItem.Title>
                                    </ListItem.Content>
                                </ListItem>
                                <ListItem onPress={()=>this.accionCamara(2)}>
                                    <ListItem.Content>
                                    <ListItem.Title>Seleccionar foto</ListItem.Title>
                                    </ListItem.Content>
                                </ListItem>
                            </BottomSheet>
                        </KeyboardAvoidingView>
                    
            
        </View>)
    }
}

const mapearEstado=state=>{
    return {
        id:state.Usuario.id
    }
}

export default connect(mapearEstado)(OrdenDetalle)

const styles = StyleSheet.create({
    botonTab: {
      flex: 1,
      padding: 16,
      borderRadius: 32,
      alignItems: 'center',
    },
    textTab: {
      textAlign: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: '#F7F8F9',
    },
    header: {
      backgroundColor: COLOR_PRIMARY,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
      height: 96,
      overflow: 'hidden',
      paddingTop: getStatusBarHeight(),
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontFamily: Montserrat,
      fontSize: 17,
      color: '#fff',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    btnClose: {
      position: 'absolute',
      bottom: 20,
      left: 16,
    },
    btnOption: {
      position: 'absolute',
      bottom: 20,
      right: 16,
    },
    containerTime: {
      flexDirection: 'row',
      height: 48,
      margin: 16,
      borderRadius: 24,
      backgroundColor: '#FFF',
    },
    btnTime: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    txtTime: {
      fontFamily: Montserrat,
      fontSize: 12,
      color: '#1A051D',
    },
    svgHover: {
      position: 'absolute',
      bottom: 0,
      left: 40,
    },
    boxStatus: {
      margin: 16,
      backgroundColor: '#FFA26B',
      borderRadius: 16,
      paddingTop: 20,
      paddingLeft: 24,
      paddingBottom: 23,
    },
    txtGood: {
      fontSize: 20,
      color: '#FFF',
      fontFamily: Montserrat,
      fontWeight: '500',
    },
    txtKeep: {
      fontSize: 16,
      color: '#FFF',
      fontFamily: Montserrat,
    },
    boxHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    containerChart: {
      borderRadius: 16,
      backgroundColor: '#FFF',
      marginHorizontal: 16,
      marginBottom: 16,
      overflow: 'hidden',
    },
    boxContent: {
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    txtTitle: {
      marginLeft: 8,
      fontFamily: Montserrat,
      fontSize: 14,
      color: '#1A051D',
      flex: 1,
    },
    line: {
      height: 1,
      backgroundColor: '#F7F8F9',
      borderRadius: 16,
    },
    boxBottom: {
      flexDirection: 'row',
    },
    btnBottom: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 12,
    },
    txtBtnBottom: {
      fontSize: 14,
      color: '#ABA4AC',
      fontFamily: Montserrat,
    },
    txtBtnBottomActive: {
      fontSize: 14,
      color: '#0084F4',
      fontFamily: Montserrat,
    },
    lineVertical: {
      width: 1,
      backgroundColor: '#F7F8F9',
      borderRadius: 16,
    },
  });