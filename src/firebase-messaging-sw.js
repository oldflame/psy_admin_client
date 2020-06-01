// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  messagingSenderId: '570163638006',
  apiKey: "AIzaSyC2s5W6UGVjmTjRlfM8mVlRFiAj6HUDefo",
  authDomain: "pysch-changiz.firebaseapp.com",
  databaseURL: "https://pysch-changiz.firebaseio.com",
  projectId: "pysch-changiz",
  storageBucket: "pysch-changiz.appspot.com",
  messagingSenderId: "570163638006",
  appId: "1:570163638006:web:e9c007f15d3429110246d7",
  measurementId: "G-E9JB8G20FD"
});
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();