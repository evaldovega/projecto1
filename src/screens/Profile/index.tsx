import React, {memo} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ScrollView, StatusBar, TouchableHighlightBase} from "react-native";
import SvgClient1 from "svgs/profile/SvgClient1";
import SvgClient2 from "svgs/profile/SvgClient2";
import SvgClient3 from "svgs/profile/SvgClient3";
import SvgClient4 from "svgs/profile/SvgClient4";
import SvgClient5 from "svgs/profile/SvgClient5";
import SvgWork1 from "svgs/profile/SvgWork1";
import SvgWork2 from "svgs/profile/SvgWork2";
import SvgWork3 from "svgs/profile/SvgWork3";
import SvgAvatar from "svgs/profile/SvgAvatar";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {Lato, Montserrat} from "utils/fonts";
import SvgBack from "svgs/profile/SvgBack";
import SvgNoti from "svgs/profile/SvgNoti";
import { COLOR_PRIMARY } from 'Constantes';
import {connect} from 'react-redux';
import { Icon } from "react-native-elements";
import Input from 'screens/SiginIn/components/Input';
import {SET} from 'Redux/actions/Usuario'
import AsyncStorage from '@react-native-community/async-storage';
import { ROUTERS } from 'utils/navigation';

const dataClient = [
    SvgClient1,
    SvgClient2,
    SvgClient3,
    SvgClient4,
    SvgClient5
];
const dataWork = [
    {
        title: "Illustration Collection #2",
        Svg: SvgWork1
    },
    {
        title: "Work Form Home #1",
        Svg: SvgWork2
    },
    {
        title: "Illustration Collection #2",
        Svg: SvgWork3
    }
];



class Profile extends React.Component {

    componentDidUpdate(){
        console.log(this.props.usuario.name)
    }

    state = {
        password: "",
    }

    actualizarUsuarioData() {
        const userData = {
            name: this.props.usuario.name,
            lastname: this.props.usuario.lastname,
            email: this.props.usuario.email,
            cellphone: this.props.usuario.cellphone,
            password: this.state.password != "" ? this.state.password : null
        }
        global.ordering.users(this.props.usuario.id).save(userData).then(r => {
            console.log(r.response.error)
            
            global.ordering.users(this.props.usuario.id).get().then(r => {
                const {id,name,lastname,birthdate,email,phone,cellphone,photo,data_map,session}=r.response.data.result
                AsyncStorage.setItem('user',JSON.stringify({id,name,lastname,birthdate,email,phone,cellphone,photo,data_map}))
            })
            
        })
    }

    cerrarSesion() {
        global.ordering.users().logout().then(r => {
            if(r.response.error){
                console.log(r.response)
            }else{
                
                AsyncStorage.removeItem("user");
                AsyncStorage.removeItem("token");

                this.props.navigation.navigate(ROUTERS.SignIn);
            }
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <StatusBar
                    translucent={true}
                    backgroundColor={'transparent'}
                    barStyle={'light-content'}
                    style={{zIndex: 9}}
                />
                <View style={[styles.header, {position: 'relative'}]}>
                    <View
                    style={{
                        backgroundColor: COLOR_PRIMARY,
                        position: 'absolute',
                        width: '100%',
                        height: 96,
                    }}></View>
                    
                    <Text style={styles.title}>Perfil</Text>
                    <TouchableOpacity
                        style={styles.btnClose}
                        onPress={() => this.props.navigation.pop()}>
                        <Icon
                            name="chevron-back"
                            type="ionicon"
                            color="#ffff"
                            size={24}
                        />
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    <SvgAvatar style={styles.avatar}/>
                    <Text style={styles.name}>
                        {this.props.usuario.name} {this.props.usuario.lastname}
                    </Text>
                    <Text style={styles.job}>
                        {this.props.usuario.email}
                    </Text>
                    <TouchableOpacity style={styles.btnUpdate} onPress={() => { this.cerrarSesion(); }}>
                        <Text style={styles.txtUpdate}>Cerrar sesión</Text>
                    </TouchableOpacity>


                    <View style={styles.content}>
                        <Text style={styles.titleContent}>Actualiza tus datos</Text>
                        <View style={styles.client}>
                            <Input mt={20} value={this.props.usuario.name} onChangeText={(t) => this.props.cambiarPropiedadUsuario({name: t})} placeholder={"Nombre"} />
                            <Input mt={10} value={this.props.usuario.lastname} onChangeText={(t) => this.props.cambiarPropiedadUsuario({lastname: t})} placeholder={"Apellido"} />
                            <Input mt={10} value={this.props.usuario.email} onChangeText={(t) => this.props.cambiarPropiedadUsuario({email: t})} placeholder={"Correo electrónico"} />
                            <Input mt={10} pass={true} placeholder={"Contraseña"} onChangeText={(p) => this.setState({password: p})} />
                            <Input mt={10} value={this.props.usuario.cellphone} onChangeText={(t) => this.props.cambiarPropiedadUsuario({cellphone: t})} placeholder={"Teléfono celular"} />
                            
                            <TouchableOpacity style={styles.btnSignIn} onPress={() => {this.actualizarUsuarioData()}}>
                                <Text style={{color:'white'}}>Actualizar datos</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const mapearEstado = e => {
    return {
        usuario: e.Usuario
    }
}

const mapearAcciones = e => {
    return {
        cambiarPropiedadUsuario: (data) => {
            e(SET(data))
        }
    }
}
export default connect(mapearEstado, mapearAcciones)(Profile);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8F9'
    },
    avatar: {
        marginTop: getStatusBarHeight(true) + 10,
        alignSelf: 'center'
    },
    back: {
        position: 'absolute',
        left: 16,
        top: getStatusBarHeight(true) + 10
    },
    noti: {
        position: 'absolute',
        right: 16,
        top: getStatusBarHeight(true) + 10
    },
    name: {
        fontFamily: Montserrat,
        fontWeight: '500',
        fontSize: 18,
        color: '#1A051D',
        textAlign: 'center',
        marginTop: 8
    },
    job: {
        fontFamily: Montserrat,
        fontSize: 14,
        color: '#6D5F6F',
        textAlign: 'center',
        marginTop: 8
    },
    btnUpdate: {
        width: 160,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#0084F4',
        marginTop: 16,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    txtUpdate: {
        fontFamily: Montserrat,
        fontSize: 13,
        color: '#FFF',
    },
    containerInfo: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        marginTop: 20,
        marginBottom: 32
    },
    col: {
        alignItems: 'center',
        flex: 1
    },
    value: {
        fontFamily: Montserrat,
        fontSize: 20,
        color: '#1A051D'
    },
    title: {
        fontFamily: Montserrat,
        fontSize: 17,
        color: '#fff',
        fontWeight: '500'
    },
    line: {
        width: 1,
        backgroundColor: '#EAE8EA',
        height: 32
    },
    content: {
        flex: 1,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingBottom: 20,
        marginTop: 40,
    },
    titleContent: {
        fontFamily: Montserrat,
        fontSize: 16,
        color: '#1A051D',
        textTransform: 'uppercase',
        marginTop: 28,
        alignSelf: 'center',
    },
    titleWork: {
        position: 'absolute',
        left: 16,
        right: 16,
        bottom: 19,
        fontFamily: Montserrat,
        fontSize: 14,
        color: '#FFF'
    },
    svgWork: {
        marginRight: 16
    },
    client: {
        marginTop: 12,
    },
    btnSignIn: {
        backgroundColor: COLOR_PRIMARY,
        borderRadius: 24,
        width: '80%',
        marginLeft: '10%',
        marginTop: 40,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
      },
    work: {
        marginTop: 16
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
    btnClose: {
        position: 'absolute',
        bottom: 20,
        left: 16,
    },
});
