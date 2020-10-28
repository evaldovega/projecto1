import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ScrollView, StatusBar,Image,VirtualizedList,Animated, Easing,RefreshControl} from "react-native";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {Montserrat} from "utils/fonts";
import {COLOR_PRIMARY} from 'Constantes'
import {SearchBar,Divider,Rating,ListItem, Avatar} from 'react-native-elements'
import SvgOption from "svgs/staticsHealth/SvgOptions";
import SvgSetting from "svgs/staticsHealth/SvgSetting";
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux'


class Footer extends React.Component{
    state = {
        progress: new Animated.Value(0),
    };
    componentDidUpdate(prev){
        if(prev.animar!=this.props.animar && this.props.animar){
            Animated.timing(this.state.progress, {toValue: 1,duration: 200,easing: Easing.linear}).start();
        }else{
            this.state.progress.setValue(0)
        }
    }
    render(){
        return (this.props.cargando ? <Text></Text> : (<View style={{flex:1,justifyContent:'center',alignItems:'center',marginVertical:24}}>
        <LottieView  progress={this.state.progress} autoSize style={{width:150}}
        source={require('Animaciones/check.json')}/>
        <Animated.View style={{opacity:this.state.progress}}>
            <Text style={[styles.title,{color:COLOR_PRIMARY}]}>No hay mas tiendas</Text>
        </Animated.View>
    </View>))
    }
    
   
}

class Inicio extends React.Component {
    state={
        animar:false,
        cargando:false,
        negocios:[],
        q:''
    }
    cargar=()=>{
        this.setState({cargando:true,q:""})
        global.ordering.businesses().parameters({'type':1,'category':2,'params':'zones,name,about,logo,schedule,featured_products,reviews,delivery_time,header','location':'10.999897,-74.804335'}).get().then(r=>{
            const negocios=r.response.data.result.map(n=>n.original)
            negocios.unshift({name:'Tienda 1',id:0})
            this.setState({negocios:negocios,cargando:false})
        }).catch(error=>{
            this.setState({cargando:false})
        })
    }

    detalle=(n)=>{
        this.props.navigation.push('Negocio',{...n})
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
        return (
            <ListItem key={n.id} onPress={()=>this.detalle(n)}  style={{borderRadius:8,elevation:1,margin:8,overflow:'hidden'}}>
                <Avatar rounded size={64}  source={{uri:n.header}}/>
                <ListItem.Content>
                    <ListItem.Title>{n.name}</ListItem.Title>
                    <ListItem.Subtitle>{n.about}</ListItem.Subtitle>
                    <Rating imageSize={12} readonly startingValue={n.reviews.total} />
                </ListItem.Content>
            </ListItem>
        )
    }
        
        
    
    getItem = (data, index) => {
        return this.state.negocios[index];
    }

    getItemCount=()=>{
        return this.state.negocios.length
    }
    final = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 16;
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
                

                {this.state.cargando ? <View style={{alignItems:'center',justifyContent:'center'}}>
                    <LottieView source={require('Animaciones/pin.json')} loop autoSize autoPlay style={{width:200}}/>
                    <Text style={[styles.title,{color:COLOR_PRIMARY}]}>Espere un momento...</Text>
                </View> : <>

                
                <View style={{padding:16}}>
                    <Text style={styles.txtTime}>Hola {this.props.name} dónde quieres pedir hoy</Text>
                </View>
                <SearchBar value={this.state.q} containerStyle={{backgroundColor:'#ffff',borderBottomColor:'transparent',borderTopColor:'transparent'}} inputContainerStyle={{backgroundColor:'#ffff'}} placeholder='Escribelo aquí...' onChangeText={(t)=>this.setState({q:t})} lightTheme={true}/>
                
                <VirtualizedList
                    maxToRenderPerBatch={40}
                    windowSize={4}
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
                            this.setState({animar:false})
                        }
                    }}
                    ListFooterComponent={<Footer cargando={this.state.cargando} animar={this.state.animar}/>}
                />
                
                
                
                </>}
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
