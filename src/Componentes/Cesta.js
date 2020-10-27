import React from 'react'
import {View,Text} from 'react-native'
import {Icon} from 'react-native-elements'
import {Lato} from 'utils/fonts'
class Cesta extends React.Component{
    render(){
        return (
            <View style={{height:47,padding:24,flexDirection:'column',backgroundColor:'#B03A2E',alignItems:'center'}}>
                 <Text style={{color:'#ffff',fontWeight:'bold',fontFamily:Lato}}>Cesta vacia</Text>
            </View>
        )
    }
}

export default Cesta