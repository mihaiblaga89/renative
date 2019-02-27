import { AppRegistry, Platform } from 'react-native';
import App from '../src/app';
import Api from '../src/api';

const { isTV } = Platform;

Api.platform = 'androidtv';

AppRegistry.registerComponent('App', () => App);
