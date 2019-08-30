import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GetScreen from './GetScreen';

import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBX0iZrXKqQZwFw-JvMe07n92_XTmlVN8Y",
    authDomain: "a7aquiz.firebaseapp.com",
    databaseURL: "https://a7aquiz.firebaseio.com",
    projectId: "a7aquiz",
    storageBucket: "",
    messagingSenderId: "431453468575",
    appId: "1:431453468575:web:2c048ab5634233b8"
  };
  

  firebase.initializeApp(firebaseConfig);

ReactDOM.render(<GetScreen />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
