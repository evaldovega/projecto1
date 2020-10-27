import { COLOR_PRIMARY } from 'Constantes'
import React from 'react'
import { Image,View,Text,ScrollView} from 'react-native'
import { ListItem,CheckBox,Input,ButtonGroup,Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

class Producto extends React.Component{
    componentDidMount(){
        //console.log("Producto ",this.props.route.params)
        
    }
    renderExtras=(extras)=>{
        return extras.map(e=>{
            return (
                <>
                    {e.options.map(o=>(
                        <View style={{marginHorizontal:16}}>
                            <ListItem.Subtitle>{o.name} (Min. {o.min} Max. {o.max})</ListItem.Subtitle>
                            {o.suboptions.map(_o=>(
                                 <View style={{flexDirection:'row',alignItems:'center'}}>
                                     <CheckBox />
                                    <ListItem.Subtitle>{_o.name}</ListItem.Subtitle>
                                </View>
                            ))}
                        </View>
                    ))}
                </>
            )
        })
    }
    render(){
        const add = () => <Button title='+' icon={
            <Icon
              name="plus"
              size={15}
              color={COLOR_PRIMARY}
            />
          }/>
        const {images,name,extras}=this.props.route.params.producto
        return (<View style={{flex:1,backgroundColor:'#ffff'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image style={{width:'100%',height:undefined,aspectRatio:16/9}} source={{uri:images}}/>
                <View style={{flex:1,backgroundColor:'#ffff',borderTopLeftRadius:16,borderTopRightRadius:16,padding:32,marginTop:-24,elevation:3}}>
                    <Text style={{fontSize:18,margin:8}}>{name}</Text>
                    {this.renderExtras(extras)}
                    <Text>Instrucciones Especiales</Text>
                    <Input multiline={true} numberOfLines={4}/>
                </View>
            </ScrollView>
            <View style={{flex:1,flexDirection:'row'}}>
                <Button icon={<Icon name='plus'/>}></Button>
            </View>
        </View>)
    }
}

export default Producto