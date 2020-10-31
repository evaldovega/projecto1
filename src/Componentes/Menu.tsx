import React, {memo, useCallback, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from "react-native";
import SvgAvatar from "svgs/menu/SvgAvatar";
import {Montserrat} from "utils/fonts";
import {useNavigation} from '@react-navigation/native';
// @ts-ignore
import {navigate} from "utils/navigation";
import {connect} from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import {ROUTERS} from 'utils/navigation'


const _ROUTERS = [
    'Inicio',
    'Registro',
    'MisDirecciones',
]

interface Props {
    onOpen: () => void;
    onClose: () => void
}

const LeftMenu = memo((props: Props) => {

    const [index, setIndex] = useState(0);

    const onPress = (key: string, index: number) => {
        props.onClose();
        navigate(key);
        setIndex(index);
    };

    const onLogout = () => {
        AsyncStorage.setItem('token',null)
        AsyncStorage.setItem('user', null)
        props.onClose();
        navigate(ROUTERS.SignIn)
    }
    return (
        <View style={styles.container}>
            <SvgAvatar/>
            <Text style={styles.txtName}>{props.name}</Text>
            <Text style={styles.txtBalance}></Text>
            <View style={{height: 60}}/>
            {
                _ROUTERS.map((item, key) => {
                    return (
                        <TouchableOpacity style={styles.btn} onPress={() => onPress(item, key)} key={key}>
                            <Text style={[styles.txt, {color: index !== key ? '#969696' : '#4B66EA'}]}>{item}</Text>
                        </TouchableOpacity>
                    )
                })
            }
            <TouchableOpacity style={styles.btn} onPress={() => onLogout()}>
                <Text style={[styles.txt, {color: '#4B66EA'}]}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    )
});

const mapearEstado=state=>{
    return {
        name:state.Usuario.name
    }
}
export default connect(mapearEstado)(LeftMenu);

const styles = StyleSheet.create({
    btn: {
        height: 48,
        marginBottom: 20,
        justifyContent: 'center'
    },
    txt: {
        fontSize: 16,
        color: '#969696',
        fontFamily: Montserrat,
        textTransform: 'uppercase'
    },
    txtBalance: {
        fontSize: 14,
        color: '#969696',
        fontFamily: Montserrat,
        fontWeight: '600',
        textTransform: 'uppercase',
        marginTop: 2
    },
    txtName: {
        fontSize: 18,
        color: '#131313',
        fontFamily: Montserrat,
        fontWeight: '600',
        textTransform: 'uppercase',
        marginTop: 9
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: 100,
        paddingLeft: 40
    }
});
