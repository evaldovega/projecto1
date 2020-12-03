import React, {memo, useCallback,useState } from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Alert, Image, ImageBackground, ScrollView} from "react-native";
import {useNavigation, CurrentRenderContext} from "@react-navigation/native";
import Header from "screens/SiginIn/components/Header";
import Input from "screens/SiginIn/components/Input";
import {Montserrat} from "utils/fonts";
import SvgFaceId from "svgs/signIn/SvgFaceId";
import {getBottomSpace} from "react-native-iphone-x-helper";
import {ROUTERS} from "utils/navigation";
import AsyncStorage from '@react-native-community/async-storage'
import { COLOR_PRIMARY } from 'Constantes';
import LottieView from 'lottie-react-native';

class SignIn extends React.Component {
    
    state = {
        email: "",
        password: ""
    }

    onPressSignIn(){
        //navigate(ROUTERS.Dashboard);
        console.log("EMAIL ",this.state.email)
        console.log("PASWORD ",this.state.password)
        global.ordering.users().auth(
            {
                email: this.state.email,
                password: this.state.password
            }
        ).then(async (r)=>{
            console.log(r)
            if(r.response.data.error){
                Alert.alert('Ha ocurrido un error',r.response.data.result.join("\n"))
            }else{
                const {id,name,lastname,birthdate,email,phone,photo,data_map,session}=r.response.data.result
                
                global.ordering.setAccessToken(session.access_token) // Asignacion de token de inicio a SDK ordering
                // Se almacena token de inicio y data de user para algunas consultas
                await AsyncStorage.setItem('token',session.access_token)
                await AsyncStorage.setItem('user',JSON.stringify({id,name,lastname,birthdate,email,phone,photo,data_map}))
                this.props.navigation.navigate('Inicio');
            }
        }).catch(error=>{
            console.log("ERROR")
            console.log(error)
        })
    }

    onPressForgot() {
        this.props.navigation.navigate(ROUTERS.ForgotPassword);
    }

    render(){
        return (
            // <ImageBackground
            //     source={require('imagenes/bgfondo.png')}
            //     style={styles.bgimage}>
                    <View style={styles.container}>
                        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('imagenes/logo.png')} style={{marginTop: 20, alignSelf:'center',height:200, width:150,resizeMode:'contain'}}></Image>
                            <LottieView autoPlay loop={false} autoSize style={{width:'100%',top:0,position:"absolute",left:0}} source={require('Animaciones/confetti.json')}/>
                            <Input mt={10} placeholder={'Email'} value={this.state.email} onChangeText={(e)=>this.setState({email: e})} />
                            <Input mt={16} pass={true} placeholder={'Contraseña'} value={this.state.password} onChangeText={(t)=>this.setState({password: t})}/>
                            <View style={styles.containerSignIn}>
                                <TouchableOpacity style={styles.btnSignIn} onPress={() => this.onPressSignIn()}>
                                    <Text style={styles.txtSignIn}>ACCEDER</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.btnForgot} onPress={() => this.onPressForgot()}>
                                <Text style={styles.txtForgot}>¿Olvidaste tu contraseña?</Text>
                            </TouchableOpacity>

                            <View style={styles.containerOr}>
                                <View style={styles.line}/>
                                <Text style={styles.txtOr}>O</Text>
                                <View style={styles.line}/>
                            </View>

                            <TouchableOpacity style={styles.btnSignFb} onPress={() => this.props.navigation.navigate('Registro')}>
                                <Text style={styles.txtSignInFb}>Regístrate ahora</Text>
                            </TouchableOpacity>

                            { /*
                            <TouchableOpacity style={styles.btnSignInGoogle}>
                                <Text style={styles.txtSignInFb}>Sign In With Google</Text>
                            </TouchableOpacity>
                            */ }
                        </ScrollView>
                    </View>
            // </ImageBackground>
        )
    }
}

export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#FFF',
        alignContent: 'center',
        justifyContent: 'center',
    },
    containerSignIn: {
        flexDirection: 'row',
        marginHorizontal: 40,
        marginTop: 24
    },
    btnSignIn: {
        backgroundColor: COLOR_PRIMARY,
        borderRadius: 24,
        flex: 1,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bgimage: {
        resizeMode: 'cover',
        justifyContent: 'center',
        flex: 1,
      },
    txtSignIn: {
        fontFamily: Montserrat,
        fontWeight: '600',
        color: '#FFF',
        fontSize: 17
    },
    btnFaceId: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: '#6979F8',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20
    },
    btnForgot: {
        marginTop: 24,
        alignSelf: 'center'
    },
    txtForgot: {
        fontSize: 12,
        color: '#0F4C81',
        fontFamily: Montserrat,
        fontWeight: '500'
    },
    containerOr: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 40,
        marginTop: 24
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#F0F0F0'
    },
    txtOr: {
        marginHorizontal: 20,
        fontSize: 16,
        color: '#1A051D',
        fontFamily: Montserrat,
        fontWeight: 'normal'
    },
    btnSignFb: {
        marginHorizontal: 40,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLOR_PRIMARY,
        marginTop: 16,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    txtSignInFb: {
        fontWeight: '600',
        fontSize: 17,
        color: '#FFF',
        textTransform: 'uppercase'
    },
    btnSignInGoogle: {
        marginHorizontal: 40,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FF647C',
        marginTop: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnSignUp: {
        alignSelf: 'center',
        marginTop: 10
    },
    txtSignUp: {
        fontSize: 12,
        color: '#0F4C81',
        fontFamily: Montserrat,
        fontWeight: '500'
    }
})
