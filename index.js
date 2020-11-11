/**
 * @format
 */
import {decode, encode} from 'base-64';
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}
process.browser = true;

import PouchDB from 'pouchdb';
global.BD = new PouchDB('mydb.db', {
  adapter: 'react-native-sqlite',
  revs_limit: 1,
  auto_compaction: true,
});
import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import MainNavigation from './src/nav/MainNav';
console.disableYellowBox = true;
import {Ordering} from 'ordering-api-sdk';
import OneSignal from 'react-native-onesignal';
import {ONESIGNAL_ID} from 'Constantes';
import {Provider} from 'react-redux';
import configureStore from 'Redux/configuracion';

const store = configureStore();

global.userAddresses = [];
global.addressSelected = null;

class App extends React.Component {
  componentDidMount() {
    global.ordering = new Ordering({
      language: 'es',
      project: 'mydomi',
    });

    OneSignal.setLogLevel(6, 0);
    OneSignal.init(ONESIGNAL_ID, {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.inFocusDisplaying(2);
    OneSignal.promptForPushNotificationsWithUserResponse(function (permiso) {
      console.log(permiso);
    });
  }
  render() {
    return (
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => App);
