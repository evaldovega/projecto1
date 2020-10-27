/**
 * @format
 */
import {decode, encode} from 'base-64'
if (!global.btoa) {
    global.btoa = encode;
}
if (!global.atob) {
    global.atob = decode;
}
process.browser = true

import PouchDB from 'pouchdb'
global.BD=new PouchDB('mydb.db', { adapter: 'react-native-sqlite' })

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import MainNavigation from "./src/nav/MainNav";
console.disableYellowBox = true
import {Ordering} from 'ordering-api-sdk';



global.ordering = new Ordering({
    language:'es',
    project: 'mydomi'
})

AppRegistry.registerComponent(appName, () => MainNavigation);
