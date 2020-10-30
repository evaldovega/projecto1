import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert, ScrollView, StatusBar,Image,VirtualizedList,Animated, Easing,RefreshControl, Modal} from "react-native";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {Montserrat} from "utils/fonts";
import {COLOR_ACCENT, COLOR_PRIMARY, COLOR_TEXT,COLOR_BG_TAPBAR,COLOR_BG, COLOR_DESATIVADO} from 'Constantes'
import {SearchBar,Divider,Rating,ListItem, Avatar,Icon} from 'react-native-elements'
import SvgOption from "svgs/staticsHealth/SvgOptions";
import SvgSetting from "svgs/staticsHealth/SvgSetting";
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import TabBar from 'Componentes/TabBar'

const logo=require('imagenes/logo.png')

class Footer extends React.Component{
    state = {
        progress: new Animated.Value(0),
    };
    componentDidUpdate(prev){
        if(prev.animar!=this.props.animar && this.props.animar){
            Animated.timing(this.state.progress, {toValue: 1,duration:800,easing: Easing.linear}).start();
        }else{
            this.state.progress.setValue(0)
        }
    }
    render(){
        return (this.props.cargando ? <Text></Text> : (<View style={{flex:1,justifyContent:'center',alignItems:'center',marginVertical:24}}>
        <LottieView  progress={this.state.progress} autoSize style={{width:150}}
        source={require('Animaciones/no_mas.json')}/>
        <Animated.View style={{opacity:this.state.progress}}>
            <Text style={[styles.title,{color:COLOR_PRIMARY}]}>No hay mas tiendas</Text>
        </Animated.View>
    </View>))
    }
    
   
}

class Inicio extends React.Component {
    state={
        userId: '',
        desactivar:false,
        animar:false,
        cargando:false,
        negocios:[],
        tipo:'',
        q:'',
        primeraDireccion: '',
        lat: '',
        lng: '',
        addressListVisible: false,
        addressResultsList: [],
    }

    cargar=()=>{
        this.setState({cargando:true,q:""})
        console.log("LATLONG", `${this.state.lat},${this.state.lng}`)
        global.ordering.businesses().parameters({'params':'zones,name,about,logo,schedule,featured_products,reviews,delivery_time,header,food,alcohol,groceries,laundry','location':`${this.state.lat},${this.state.lng}`}).get().then(r=>{
            const negocios=r.response.data.result.map(n=>n.original)
            //negocios.unshift({name:'Tienda 1',id:0})
            console.log(negocios[0])
            this.setState({negocios:negocios,cargando:false})
        }).catch(error=>{
            this.setState({cargando:false})
        })
    }

    setTipo=(t)=>{
        this.setState({tipo:(this.state.tipo==t?'':t)})
    }

    detalle=(n)=>{
        
        if(!this.state.desactivar){
            this.props.navigation.push('Negocio',{...n})
            this.setState({desactivar:true})
            setTimeout(()=>{
                this.setState({desactivar:false})
            },4000)
        }
        
        
    }

    cargarUserAddresses=()=> {
        AsyncStorage.getItem("user").then((user)=>{
            userId = JSON.parse(user).id
            this.setState({userId: userId})
            global.ordering.users(userId).addresses().get().then(async(r) => {
                this.setState({addressResultsList: r.response.data.result})
                
                if(r.response.data.result.length > 0){
                    var addressSelected = false
                    r.response.data.result.forEach((address) => {
                        global.userAddresses.push(address)
                        if(address.default){
                            this.setState(address.location)
                            this.setState({primeraDireccion: address.address})
                            addressSelected = true
                        }
                    })
                    
                    if(!addressSelected){
                        let address = r.response.data.result[0]
                        this.setState(address.location)
                        this.setState({primeraDireccion: address.address})
                    }
                    this.cargar()
                }else{
                    
                }
            });
        })
        
    }

    componentDidMount(){
       this.cargarUserAddresses()
    }


    renderItem=(n)=>{
        if(this.state.q.length>4){
            if(!n.name.includes(this.state.q)){
                return (<></>)
            }
        }
        if(n.id==0){
            return (
                <View style={{paddingVertical:12}}>
                <Text style={[styles.txtTime,{fontSize:14,color:'#F1C40F',margin:12}]}>Favoritas</Text>
                {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{margin:8,justifyContent:'center'}}>
                        <Avatar rounded size={64} source={{uri:'https://i.pinimg.com/564x/67/d4/46/67d4469a08a973413a20c97905b1ebf1.jpg'}}/>
                        <ListItem.Title>Tienda 1</ListItem.Title>
                    </View>
                    <View style={{margin:8,justifyContent:'center'}}>
                        <Avatar rounded size={64} source={{uri:'https://i.pinimg.com/564x/67/d4/46/67d4469a08a973413a20c97905b1ebf1.jpg'}}/>
                        <ListItem.Title>Tienda 1</ListItem.Title>
                    </View>
                    <View style={{margin:8,justifyContent:'center'}}>
                        <Avatar rounded size={64} source={{uri:'https://i.pinimg.com/564x/67/d4/46/67d4469a08a973413a20c97905b1ebf1.jpg'}}/>
                        <ListItem.Title>Tienda 1</ListItem.Title>
                    </View>
                    <View style={{margin:8,justifyContent:'center'}}>
                        <Avatar rounded size={64} source={{uri:'https://i.pinimg.com/564x/67/d4/46/67d4469a08a973413a20c97905b1ebf1.jpg'}}/>
                        <ListItem.Title>Tienda 1</ListItem.Title>
                    </View>
                    <View style={{margin:8,justifyContent:'center'}}>
                        <Avatar rounded size={64} source={{uri:'https://i.pinimg.com/564x/67/d4/46/67d4469a08a973413a20c97905b1ebf1.jpg'}}/>
                        <ListItem.Title>Tienda 1</ListItem.Title>
                    </View>
                    <View style={{margin:8,justifyContent:'center'}}>
                        <Avatar rounded size={64} source={{uri:'https://i.pinimg.com/564x/67/d4/46/67d4469a08a973413a20c97905b1ebf1.jpg'}}/>
                        <ListItem.Title>Tienda 1</ListItem.Title>
                    </View>
                    <View style={{margin:8,justifyContent:'center'}}>
                        <Avatar rounded size={64} source={{uri:'https://i.pinimg.com/564x/67/d4/46/67d4469a08a973413a20c97905b1ebf1.jpg'}}/>
                        <ListItem.Title>Tienda 1</ListItem.Title>
                    </View>
                    <View style={{margin:8,justifyContent:'center'}}>
                        <Avatar rounded size={64} source={{uri:'https://i.pinimg.com/564x/67/d4/46/67d4469a08a973413a20c97905b1ebf1.jpg'}}/>
                        <ListItem.Title>Tienda 1</ListItem.Title>
                    </View>
                </ScrollView> */}
                </View>
            )
        }

        if(this.state.tipo!=''){
            if(this.state.tipo=='comida' && !n.food || this.state.tipo=='comida' && !n.alcohol){
                return
            }
            if(this.state.tipo=='farmacia' && !n.groceries){
                return
            }
            if(this.state.tipo=='farmacia' && !n.food){
                return
            }
            if(this.state.tipo=='farmacia' && !n.farmacy){
                return
            }
        }
        
        return (
            <TouchableOpacity onPress={()=>this.detalle(n)} >
                <View style={{marginTop:76,marginHorizontal:16,borderRadius:16,elevation:3,backgroundColor:'#ffff'}}>
                    <View style={{borderRadius:24,width:'90%',marginTop:-50,alignSelf:'center',overflow:'hidden',backgroundColor:COLOR_DESATIVADO,elevation:3}}>
                        {n.header && n.header!='' ? <Image style={{width:'100%',height:undefined,aspectRatio:16/9,alignSelf:'center'}} source={{uri:n.header}}/> : <Image style={{alignSelf:'center'}} source={logo}/>}
                        <View style={{backgroundColor:COLOR_PRIMARY,borderRadius:18,paddingHorizontal:8,paddingVertical:4,position:'absolute',top:16,left:16,flexDirection:'row',justifyContent:'center',alignItems:'center'}}> 
                            <Icon name='star' color={COLOR_ACCENT} size={12}/>
                            <Text style={{color:'#ffff',fontSize:12,fontWeight:'bold'}}>{n.reviews.total}</Text>
                        </View>
                    </View>
                    
                    <View style={{padding:16}}>
                            <Text style={{alignSelf:'center',fontSize:24,color:COLOR_TEXT,fontWeight:'bold',textTransform:'uppercase'}}>{n.name}</Text>
                            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:8}}>
                                
                                <View style={{flexDirection:'row'}}>
                                    <Icon name='clock' type='material-community' size={24} color={COLOR_PRIMARY} style={{marginRight:4}}/><Text style={{color:COLOR_TEXT,fontSize:18}} > {n.delivery_time}min</Text>
                                </View>

                                <View style={{flexDirection:'row'}}>
                                    <View style={{backgroundColor:COLOR_PRIMARY,borderRadius:24,paddingVertical:4,paddingHorizontal:16,marginRight:8,alignItems:'center'}}>
                                        <Text style={{color:'#ffff',fontSize:10}}>Abierto</Text>
                                        <Text style={{color:'#ffff',fontSize:10}}>{n.today && n.today.lapses && n.today.lapses.length>0 ? n.today.lapses[0].open.hour+':'+n.today.lapses[0].open.minute : '00:00'}</Text>
                                    </View>
                                    <View style={{backgroundColor:COLOR_PRIMARY,borderRadius:24,paddingVertical:4,paddingHorizontal:16,alignItems:'center'}}>
                                        <Text style={{color:'#ffff',fontSize:10}}>Cerrado</Text>
                                        <Text style={{color:'#ffff',fontSize:10}}>{n.today && n.today.lapses && n.today.lapses.length>1 ? n.today.lapses[1].open.hour+':'+n.today.lapses[1].open.minute : '00:00'}</Text>
                                    </View>
                                </View>
                                
                                
                            </View>
                    </View>
                </View>
           </TouchableOpacity>
        )
    }
        
        
    
    getItem = (data, index) => {
        return this.state.negocios[index];
    }

    getItemCount=()=>{
        return this.state.negocios.length
    }

    final = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 128;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
    };

    openAddressList() {
        this.setState({addressListVisible: true})
    }

    removeAddress = (addressId, listItemKey) => {
        if(this.state.addressResultsList.length > 1){
            global.ordering.users(this.state.userId).addresses(addressId).delete().then(async(r) => {
                this.setState(state=>{
                    console.log(r.response.data)
                    state.addressResultsList.splice(listItemKey,1)

                    return {...state}
                })
            })
        }else{
            Alert.alert("Debes tener al menos una dirección registrada", "");
        }
    }

    onAddressSelected = (address, location) => {
        this.setState({primeraDireccion: address, lat: location.lat, lng:location.lng, addressListVisible: false})
        this.cargar()
    }

    render(){
            return (
            <View style={styles.container}>
                <Modal
                    transparent={true}
                    animationType={'slide'}
                    visible={this.state.addressListVisible}>
                    <View style={styles.modalBackground}>
                        <View style={styles.cardOverlay}>
                            <Text style={{fontSize:24, fontWeight:'bold'}}>
                                Mis direcciones
                            </Text>
                            <TouchableOpacity style={styles.btnAgregar} onPress={() => {this.setState({addressListVisible: false});this.props.navigation.navigate('AgregarUbicacion')}}>
                                <Icon name='plus' type='font-awesome' color='#ffff' size={24} style={{marginRight:4}}></Icon>
                                <Text style={{color:'white'}}>
                                    Agregar dirección
                                </Text>
                            </TouchableOpacity>
                            {
                                this.state.addressResultsList.map((address, i) => (
                                    <ListItem key={i} bottomDivider onPress={() => this.onAddressSelected(address.address, address.location)}>
                                        {address.tag == "home" ? 
                                            <Icon name="home" type="font-awesome"></Icon>
                                        : address.tag == "office" ?
                                            <Icon name="building" type="font-awesome"></Icon>
                                        : address.tag == "favorites" ? 
                                            <Icon name="heart" type="font-awesome"></Icon>
                                        : address.tag == "other" ?
                                            <Icon name="ellipsis-h" type="font-awesome"></Icon>
                                        : <Icon name="ellipsis-h" type="font-awesome"></Icon>
                                        }
                                        <ListItem.Content>
                                            <ListItem.Title>{address.address}</ListItem.Title>
                                        </ListItem.Content>
                                        <TouchableOpacity onPress={() => this.removeAddress(address.id, i)}>
                                            <Icon name="trash" type="font-awesome"></Icon>
                                        </TouchableOpacity>
                                    </ListItem>
                                ))
                            }
                        </View>
                    </View>
                </Modal>

                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'light-content'}/>
                <View style={styles.header}>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={() => this.openAddressList()}>
                            <Icon name='chevron-down' type='ionicon' color='#ffff' size={24} style={{marginRight:4}}></Icon>
                        </TouchableOpacity>
                        <Text numberOfLines={1} style={[styles.title,{width:'80%', fontWeight:'400',textAlign:'left'}]}>{this.state.primeraDireccion}</Text>
                    </View>
                    
                    <TouchableOpacity style={styles.btnClose}>
                        
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnOption}>
                        
                    </TouchableOpacity>
                </View>

                <LinearGradient colors={['#ffff',COLOR_BG]}>
                    <View style={{flexDirection:'row',justifyContent:'center',marginVertical:24,backgroundColor:'transparent'}}>
                        
                        <TouchableOpacity onPress={()=>this.setTipo('comida')}>
                            <View style={{backgroundColor:(this.state.tipo=='comida'? COLOR_ACCENT: COLOR_PRIMARY),width:80,height:56,borderRadius:28,justifyContent:'center',alignItems:'center',marginHorizontal:2}}>
                                <LottieView autoPlay loop={false} autoSize style={{width:'90%', alignSelf:'center'}} source={require('Animaciones/animation_licor.json')}/>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.setTipo('ropa')}>
                            <View style={{backgroundColor:(this.state.tipo=='ropa'? COLOR_ACCENT: COLOR_PRIMARY),width:80,height:56,borderRadius:28,justifyContent:'center',alignItems:'center',marginHorizontal:2}}>
                                <LottieView autoPlay loop={false} autoSize style={{width:'90%', alignSelf:'center'}} source={require('Animaciones/animation_moda.json')}/>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.setTipo('farmacia')}>
                        <View style={{backgroundColor:(this.state.tipo=='farmacia'? COLOR_ACCENT: COLOR_PRIMARY),width:80,height:56,borderRadius:28,justifyContent:'center',alignItems:'center',marginHorizontal:2}}>
                            <LottieView autoPlay loop={false} autoSize style={{width:'90%', alignSelf:'center'}} source={require('Animaciones/animation_pastilla.json')}/>
                        </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.setTipo('otro')}>
                            <View style={{backgroundColor:(this.state.tipo=='otro'? COLOR_ACCENT: COLOR_PRIMARY),width:80,height:56,borderRadius:28,justifyContent:'center',alignItems:'center',marginHorizontal:2}}>
                            <LottieView autoPlay loop={false} autoSize style={{width:'40%', alignSelf:'center'}} source={require('Animaciones/animation_puntos.json')}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>


                {/*<SearchBar value={this.state.q} containerStyle={{backgroundColor:'#ffff',borderBottomColor:'transparent',borderTopColor:'transparent'}} inputContainerStyle={{backgroundColor:'#ffff'}} placeholder='Escribelo aquí...' onChangeText={(t)=>this.setState({q:t})} lightTheme={true}/>*/}
                
                <VirtualizedList
                    maxToRenderPerBatch={10}
                    windowSize={10}
                    removeClippedSubviews={true}
                    style={{flex: 1,padding:0,margin:0}}
                    data={this.state.negocios}
                    initialNumToRender={40}
                    renderItem={({item}) => this.renderItem(item)}
                    keyExtractor={(item) => item.id}
                    getItemCount={this.getItemCount}
                    getItem={this.getItem}
                    onEndReachedThreshold={.3}
                    refreshControl={<RefreshControl refreshing={this.state.cargando} onRefresh={this.cargar}/>}
                    onScroll={({nativeEvent})=>{
                        if(this.final(nativeEvent)){
                            if(!this.state.animar){
                                this.setState({animar:true})
                            }
                        }else{
                            if(this.state.animar){
                                this.setState({animar:false})
                            }
                        }
                    }}
                    ListFooterComponent={<Footer cargando={this.state.cargando} animar={this.state.animar}/>}
                />

                <TabBar {...this.props}/>
            </View>
        )
    }
}

const mapearEstado=state=>{
    return {
        name:state.Usuario.name
    }
}
export default connect(mapearEstado)(Inicio);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8F9'
    },
    header: {
        backgroundColor: COLOR_PRIMARY,
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
        color: '#fff',
        textTransform:'uppercase',
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
    btnAgregar: {
        backgroundColor: COLOR_PRIMARY,
        borderRadius: 24,
        width: '100%',
        marginTop: 20,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
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
        borderRadius: 32,
        backgroundColor: '#FFF',
        marginHorizontal: 0,
        marginTop: 16,
        overflow:'hidden',
        elevation:3
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
        flexDirection: 'row',alignItems:'center',paddingHorizontal:24
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
    },
    modalBackground: {
        backgroundColor: '#FFFFFF77',
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1,
    },
    cardOverlay: {
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 12,
        height: '80%',
        position:'absolute',
        bottom:0,
        width: '100%',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
});
