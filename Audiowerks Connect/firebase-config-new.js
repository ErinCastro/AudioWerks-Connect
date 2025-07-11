// For Firebase JS SDK v7.20.0 and later, measurementId is optional
if (typeof firebaseConfig === 'undefined') {
  var firebaseConfig = {
    apiKey: "AIzaSyBIJf4WsNG3_1C-9WjmMhuI-X8kLZdK958",
    authDomain: "audiowerks-8e6bf.firebaseapp.com",
    databaseURL: "https://audiowerks-8e6bf-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "audiowerks-8e6bf",
    storageBucket: "audiowerks-8e6bf.firebasestorage.app",
    messagingSenderId: "462605181203",
    appId: "1:462605181203:web:b93b118cc9b63c77907ae6",
    measurementId: "G-93R061TZ32"
  };
  if (typeof firebase !== 'undefined' && firebase.apps && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}
