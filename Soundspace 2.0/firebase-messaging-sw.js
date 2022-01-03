
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";   
importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js",
);
// For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics.
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-analytics.js",
);

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.


const firebaseConfig = {
  apiKey: "AIzaSyCDquNbc161bzsm7TV0XtgDff47nB_K3JE",
  authDomain: "soundemic-4f707.firebaseapp.com",
  databaseURL: "https://soundemic-4f707-default-rtdb.firebaseio.com",
  projectId: "soundemic-4f707",
  storageBucket: "soundemic-4f707.appspot.com",
  messagingSenderId: "446088034759",
  appId: "1:446088034759:web:494df0810824586e2741e2"
};



const app = initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = app.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload,
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "Background Message body.",
        icon: "/itwonders-web-logo.png",
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});