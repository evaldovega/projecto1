import { COLOR_PRIMARY } from 'Constantes'
import React from 'react'
import { Image,View,ScrollView,TextInput, Alert,TouchableWithoutFeedback,KeyboardAvoidingView, Keyboard,Platform} from 'react-native'
import { ListItem,CheckBox,Input,Button,Text} from 'react-native-elements'
import NotificationPopup from 'react-native-push-notification-popup';
import Icon from 'react-native-vector-icons/FontAwesome';
const icono=require('imagenes/logo.png')

const renderCustomPopup = ({ appIconSource, appTitle, timeText, title, body }) => (
    <View>
      <Text>{title}</Text>
      <Text>{body}</Text>
      <Button title='My button' onPress={() => console.log('Popup button onPress!')} />
    </View>
);

class Producto extends React.Component{
    state={
        total:'0',
        data:{
            id:'',
            comment:'',
            quantity:'0',
            options:[],
            ingredients:[]
        }
    }

    componentDidMount(){
        console.log(this.props.route.params.producto)
        this.setState(state=>{
            let data=state.data
            data={...{id:this.props.route.params.producto.id}}
            return {...data}
        })
    }

    subOpcionAgregada=(opcion_id,subopcion_id)=>{
        let opcion=this.state.data.options.find(o=>o.id==opcion_id)
        if(opcion){
            let sub=opcion.suboptions.find(e=>e==subopcion_id)
            if(sub){
                return true
            }
        }
        return false
    }
    seleccionarOpcion=(n,min,max,opcion_id,subopcion_id)=>{

        this.setState(state=>{
            let data=state.data
            let options=data.options
            let index=options.findIndex(o=>o.id==opcion_id)
            if(index>=0){
                
                let subopcion=options[index].suboptions.findIndex((s)=>s==subopcion_id)
                
                if(subopcion>=0){
                    options[index].suboptions.splice(subopcion,1)
                }else{
                    if(options[index].suboptions.length==max){
                        this.popup.show({
                            appIconSource:icono,
                            appTitle: 'SenderAPP',
                            timeText: '',
                            title: 'Lo siento',
                            body: 'No puedes agregar mas opciones a '+n+' 😬',
                            slideOutTime: 5000
                        });
                        return
                    }
                    options[index].suboptions.push(subopcion_id)
                }
            }else{
                options.push({id:opcion_id,suboptions:[subopcion_id]})
            }
            data={...options}
            return {...{...data}}
        })
        
    }
    
    renderExtras=(extras)=>{
        
        return extras.map(e=>{
            console.log("Extra ",e.id)
            return (
                <>
                    {e.options.map(o=>{
                        console.log("Opcion ",o.id)
                        return (
                        <View>
                            <Text h4>{o.name} (Min. {o.min} Max. {o.max})</Text>
                            {o.suboptions.map(_o=>(  
                               <CheckBox checked={this.subOpcionAgregada(o.id,_o.id)} onPress={()=>this.seleccionarOpcion(o.name,o.min,o.max,o.id,_o.id)} style={{flex:1}} checkedIcon='dot-circle-o' uncheckedIcon='circle-o' title={_o.name} />
                            ))}
                        </View>
                    )}
                    )}
                </>
            )
        })
    }

    ingresarInstrucciones=(t)=>{
        this.setState(state=>{
            let data=state.data
            data.comment=t
            return {...{...data}}
        })
    }

    plus=()=>{
        this.setState(state=>{
            let data=state.data
            let total=parseInt(data.quantity)
            console.log(total)
            total+=1
            data.quantity=total.toString()
            return {...{...data}}
        })
    }
    minus=()=>{
        this.setState(state=>{
            let data=state.data
            let total=parseInt(data.quantity)
            if(total-1>-1){
                total-=1
            }
            data.quantity=total.toString()
            return {...{...data}}
        })
    }

    total=()=>{
        return (this.props.route.params.producto.price*this.state.data.quantity).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
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
        return (
            <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{flex:1}}
          >
        <View style={{flex:1,backgroundColor:'#ffff',justifyContent: "space-around"}}>
            
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image style={{width:'100%',height:undefined,aspectRatio:16/9}} source={{uri:images}}/>
                <View style={{flex:1,backgroundColor:'#ffff',borderTopLeftRadius:16,borderTopRightRadius:16,padding:16,marginTop:-24,elevation:3}}>
                    <Text style={{fontSize:18,margin:8}}>{name}</Text>
                    {this.renderExtras(extras)}
                    <Text>Instrucciones Especiales</Text>
                    <TextInput multiline={true} value={this.state.data.comment} onChangeText={(t)=>this.ingresarInstrucciones(t)} numberOfLines={4} underlineColorAndroid='#ffff' style={{borderColor:'silver',borderWidth:1,borderRadius:16}}/>
                </View>
            </ScrollView>
                <Text h4 style={{textAlign:'center'}}>{this.total()}</Text>
                <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',flexGrow:32,marginHorizontal:16}}>
                    <View style={{flexDirection:'row'}}>
                        <Button icon={<Icon name='minus' color='#ffff' size={24}/>} onPress={this.minus} buttonStyle={{borderTopRightRadius:0,borderBottomEndRadius:0}}></Button>
                        <TextInput keyboardType='decimal-pad' value={this.state.data.quantity} style={{width:100,height:42,fontSize:20,textAlign:'center',borderTopColor:'silver',borderBottomColor:'silver',borderWidth:1,marginHorizontal:0,borderLeftColor:'transparent',borderRightColor:'transparent'}}/>
                        <Button icon={<Icon name='plus' color='#ffff' size={24}/>} onPress={this.plus} buttonStyle={{borderTopLeftRadius:0,borderBottomLeftRadius:0}}></Button>
                    </View>
                    <Button style={{marginLeft:64}} title='Añadir a la cesta' />
                </View>
                <NotificationPopup 
                shouldChildHandleResponderStart={true}
                shouldChildHandleResponderMove={true} 
                ref={ref => this.popup = ref} />
        </View>
        </KeyboardAvoidingView>)
    }
}

export default Producto