import React from 'react'
import {connect} from 'react-redux'
import {Avatar,Icon} from 'react-native-elements'
import {View,Image,StyleSheet,Text,TouchableOpacity,ScrollView} from 'react-native'
import {Montserrat} from "utils/fonts";
import { COLOR_BG_TAPBAR, COLOR_DESATIVADO, COLOR_PRIMARY } from 'Constantes';



class NegocioCategorias extends React.Component{
    state={
        desactivar:false
    }
    verProductos=(c)=>{
        if(!this.state.desactivar){
            this.setState({desactivar:true})
            this.props.navigation.push('NegocioProductos',{categoria:c.id})
            setTimeout(()=>{
                this.setState({desactivar:false})
            },4000)
        }
        
    }

    categorias(){
        if(this.props.data.categories){
            return this.props.data.categories.map(c=>{
                return (
                    <TouchableOpacity onPress={()=>this.verProductos(c)} disabled={this.state.desactivar}>
                        <View style={styles.card} key={c.id}>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Avatar size={64} avatarStyle={{borderRadius:24}}   source={{uri:c.image}}/>
                            <Text style={{marginLeft:32,fontSize: 16,fontFamily: Montserrat}}>{c.name}</Text>
                            </View>
                            <Icon name='chevron-right' type='evilicon' color={COLOR_DESATIVADO}/>
                        </View>
                        </View>
                    </TouchableOpacity>
                )
            })
        }
    }
    render(){
        return (<View style={{flex:1}}>
                {this.categorias()}
        </View>)
    }
}

const mapearEstado=state=>{
    return {
        data:state.Negocio.data
    }
}
export default connect(mapearEstado)(NegocioCategorias)

const styles=StyleSheet.create({
    card:{
        borderRadius: 24,
        backgroundColor: COLOR_BG_TAPBAR,
        marginHorizontal: 16,
        marginTop: 16,
        padding:12,
        overflow:'hidden'
    }
})