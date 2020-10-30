import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity,TouchableWithoutFeedback, ScrollView, StatusBar,Image,VirtualizedList,Animated, Easing,RefreshControl} from "react-native";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {Montserrat} from "utils/fonts";
import {COLOR_ACCENT, COLOR_PRIMARY, COLOR_TEXT,COLOR_BG_TAPBAR,COLOR_BG, COLOR_DESATIVADO} from 'Constantes'
import {SearchBar,Divider,Rating,ListItem, Avatar,Icon} from 'react-native-elements'
import SvgOption from "svgs/staticsHealth/SvgOptions";
import SvgSetting from "svgs/staticsHealth/SvgSetting";
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux'
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
        desactivar:false,
        animar:false,
        cargando:false,
        negocios:[],
        tipo:'',
        q:''
    }

    cargar=()=>{
        this.setState({cargando:true,q:""})
        global.ordering.businesses().parameters({'params':'zones,name,about,logo,schedule,featured_products,reviews,delivery_time,header,food,alcohol,groceries,laundry','location':'11.0140506,-74.8128827'}).get().then(r=>{
            const negocios=r.response.data.result.map(n=>n.original)
            negocios.unshift({id:-1})
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
            },2000)
        }
        
        
    }

    componentDidMount(){
       this.cargar()
    }


    renderItem=(n)=>{
        if(this.state.q.length>4){
            if(!n.name.includes(this.state.q)){
                return (<></>)
            }
        }
        if(n.id==-1){
            return (<View style={{height:96}}></View>)
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
            if(this.state.tipo=='comida' && !n.food){
                return
            }
            if(this.state.tipo=='mercado' && !n.groceries){
                return
            }
            if(this.state.tipo=='farmacia' && !n.food){
                return
            }
            if(this.state.tipo=='licores' && !n.alcohol){
                return
            }
            if(this.state.tipo=='farmacia' && !n.farmacy){
                return
            }
        }
        
        return (
            <TouchableWithoutFeedback onPress={()=>this.detalle(n)} >
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
           </TouchableWithoutFeedback>
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

    render(){
            return (
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'light-content'}/>
                <View style={styles.header}>
                    <View style={{flexDirection:'row'}}>
                        <Image style={{width:24,height:undefined}} source={require('imagenes/logo.png')}/>
                        <Text style={[styles.title,{marginLeft:8,fontWeight:'bold'}]}>SenderAPP</Text>
                    </View>
                    
                    <TouchableOpacity style={styles.btnClose}>
                        
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnOption}>
                        
                    </TouchableOpacity>
                </View>
                <View style={{flex:1,position:'relative'}}>

                <LinearGradient colors={[COLOR_BG,COLOR_BG,COLOR_BG,"#ffffff00"]} style={{position:'absolute',top:0,left:0,width:'100%',height:100,zIndex:7}}>
                    <View style={{flexDirection:'row',justifyContent:'center',marginVertical:24,backgroundColor:'transparent'}}>
                        
                        <TouchableOpacity onPress={()=>this.setTipo('mercado')}>
                            <View style={{backgroundColor:(this.state.tipo=='mercado'? COLOR_ACCENT: COLOR_PRIMARY),width:56,height:56,borderRadius:28,justifyContent:'center',alignItems:'center',marginHorizontal:2}}>
                                <Image source={require('imagenes/iconos/mercado.png')}/>
                            </View>
                        </TouchableOpacity>

                        <TouchableWithoutFeedback style={{elevation:2}} onPress={()=>this.setTipo('ropa')}>
                        <View style={{backgroundColor:(this.state.tipo=='ropa'? COLOR_ACCENT: COLOR_PRIMARY),width:56,height:56,borderRadius:28,justifyContent:'center',alignItems:'center',marginHorizontal:2}}>
                            <Image source={require('imagenes/iconos/ropa.png')}/>
                        </View>
                        </TouchableWithoutFeedback>

                        <TouchableOpacity onPress={()=>this.setTipo('comida')}>
                        <View style={{backgroundColor:(this.state.tipo=='comida'? COLOR_ACCENT: COLOR_PRIMARY),width:56,height:56,borderRadius:28,justifyContent:'center',alignItems:'center',marginHorizontal:2}}>
                            <Image source={require('imagenes/iconos/hamburguesa.png')}/>
                        </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.setTipo('licores')}>
                        <View style={{backgroundColor:(this.state.tipo=='licores'? COLOR_ACCENT: COLOR_PRIMARY),width:56,height:56,borderRadius:28,justifyContent:'center',alignItems:'center',marginHorizontal:2}}>
                            <Image source={require('imagenes/iconos/licores.png')}/>
                        </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.setTipo('farmacia')}>
                        <View style={{backgroundColor:(this.state.tipo=='farmacia'? COLOR_ACCENT: COLOR_PRIMARY),width:56,height:56,borderRadius:28,justifyContent:'center',alignItems:'center',marginHorizontal:2}}>
                            <Image source={require('imagenes/iconos/farmacia.png')}/>
                        </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.setTipo('otro')}>
                            <View style={{backgroundColor:(this.state.tipo=='otro'? COLOR_ACCENT: COLOR_PRIMARY),width:56,height:56,borderRadius:28,justifyContent:'center',alignItems:'center',marginHorizontal:2}}>
                                <Image source={require('imagenes/iconos/otro.png')}/>
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
                </View>

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
    }
});
