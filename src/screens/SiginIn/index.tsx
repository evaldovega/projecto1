import React, {memo, useCallback,useState } from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Alert, Image, ImageBackground} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Header from "screens/SiginIn/components/Header";
import Input from "screens/SiginIn/components/Input";
import {Montserrat} from "utils/fonts";
import SvgFaceId from "svgs/signIn/SvgFaceId";
import {getBottomSpace} from "react-native-iphone-x-helper";
import {ROUTERS} from "utils/navigation";
import AsyncStorage from '@react-native-community/async-storage'
import { COLOR_PRIMARY } from 'Constantes';
import LottieView from 'lottie-react-native';

const SignIn = memo(() => {
    const {navigate} = useNavigation();
    const [email,setEmail]=useState('evaldo.vega@gmail.com')
    const [password,setPassword]=useState('12345678')

    const onPressSignIn = useCallback(()=>{
        //navigate(ROUTERS.Dashboard);
        console.log("EMAIL ",email)
        console.log("PASWORD ",password)
        global.ordering.users().auth(
            {
                email: email,
                password: password
            }
        ).then(async (r)=>{
            console.log(r)
            if(r.response.data.error){
                Alert.alert('Ha ocurrido un error',r.response.data.result.join("\n"))
            }else{
                const {id,name,lastname,birthdate,email,phone,photo,data_map,session}=r.response.data.result
                
                await AsyncStorage.setItem('token',session.access_token)
                await AsyncStorage.setItem('user',JSON.stringify({id,name,lastname,birthdate,email,phone,photo,data_map}))
                navigate('Inicio');
            }
        }).catch(error=>{
            console.log("ERROR")
            console.log(error)
        })
    },[])

    const onPressForgot = useCallback(()=>{
      navigate(ROUTERS.ForgotPassword);
    },[])

    return (
        <View style={styles.container}>
        <ImageBackground
          source={require('imagenes/bgfondo.png')}
          style={styles.bgimage}>
            <Image source={require('imagenes/logo-negro.png')} style={{alignSelf:'center',marginTop:-20,marginBottom:0,width:250,resizeMode:'contain'}}></Image>
            <LottieView autoPlay loop={false} autoSize style={{width:'100%',top:0,position:"absolute",left:0}} source={require('Animaciones/confetti.json')}/>
            <Input mt={10} placeholder={'Email'} value={email} onChangeText={t=>setEmail(t)} />
            <Input mt={16} pass={true} placeholder={'Contraseña'} value= {password} onChangeText={t=>setPassword(t)}/>
            <View style={styles.containerSignIn}>
                <TouchableOpacity style={styles.btnSignIn} onPress={onPressSignIn}>
                    <Text style={styles.txtSignIn}>ACCEDER</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.btnForgot} onPress={onPressForgot}>
                <Text style={styles.txtForgot}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <View style={styles.containerOr}>
                <View style={styles.line}/>
                <Text style={styles.txtOr}>O</Text>
                <View style={styles.line}/>
            </View>

            <TouchableOpacity style={styles.btnSignFb} onPress={() => navigate('Registro')}>
                <Text style={styles.txtSignInFb}>Regístrate ahora</Text>
            </TouchableOpacity>

            { /*
            <TouchableOpacity style={styles.btnSignInGoogle}>
                <Text style={styles.txtSignInFb}>Sign In With Google</Text>
            </TouchableOpacity>
            */ }

            
            </ImageBackground>
        </View>
    )
});

export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
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
        alignItems: 'center'
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
