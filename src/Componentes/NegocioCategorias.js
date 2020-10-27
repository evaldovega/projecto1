import React from 'react'
import {connect} from 'react-redux'
import {Avatar} from 'react-native-elements'
import {View,Image,StyleSheet,Text,TouchableOpacity,ScrollView} from 'react-native'
import {Montserrat} from "utils/fonts";


class NegocioCategorias extends React.Component{
    
    verProductos=(c)=>{
        this.props.navigation.push('NegocioProductos',{categoria:c})
    }

    categorias(){
        if(this.props.data.categories){
            return this.props.data.categories.map(c=>{
                return (
                    <TouchableOpacity onPress={()=>this.verProductos(c)}>
                        <View style={styles.card} key={c.id}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Avatar size={64} rounded source={{uri:c.image}}/>
                            <Text style={{marginLeft:32,fontSize: 16,fontFamily: Montserrat}}>{c.name}</Text>
                        </View>
                        </View>
                    </TouchableOpacity>
                )
            })
        }
    }
    render(){
        return (<View style={{flex:1}}>
            <ScrollView>
                {this.categorias()}
            </ScrollView>
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
        borderRadius: 32,
        backgroundColor: '#FFF',
        marginHorizontal: 16,
        marginTop: 16,
        overflow:'hidden'
    }
})