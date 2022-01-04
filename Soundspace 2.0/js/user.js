// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
//import { getMessaging } from "https://www.gstatic.com/firebasejs/4.2.0/firebase-messaging.js";
import { getDatabase, ref, set, push, child, onChildAdded, onValue, update } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
// import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getStorage, ref as sRef, uploadBytes, uploadBytesResumable, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
//import * as firebase from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot, setDoc, updateDoc, doc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

//import { getMessaging, getToken, onMessage } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
const auth = getAuth();
const database = getDatabase();
const storage = getStorage();


onAuthStateChanged(auth, (user) => {
  if (user) {
    window.userid = user.uid;
    console.log(userid);
    window.myname = user.username
    console.log(myname);
  }
  else {
    alert('USER NOT SIGNED IN')
  }
});

//code for fresh albums starts here
const dbRef = ref(database, 'MusicFileNames/');
window.songsources = [];
window.imgsources = [];
window.songname = [];
window.artistname = [];
window.mood = [];

let i = 0;

onChildAdded(dbRef, (snapshot) => {
  var childKey = snapshot.key;
  console.log(childKey);
  var childData = snapshot.val();
  console.log(childData.SongName);

  i++;

  console.log("then");
  songsources[i] = childData.SongUrl;
  imgsources[i] = childData.ImgUrl;
  songname[i] = childData.SongName;
  artistname[i] = childData.ArtistName;
  mood[i] = childData.Mood;

  let card = document.createElement("div");
  card.className = 'card';
  card.setAttribute("onclick", "playsong(" + i + ")");
  card.setAttribute("id", "" + i + "");
  card.style.backgroundImage = "url('" + childData.ImgUrl + "')";
  document.querySelector(".fresh-album-cards").appendChild(card);

}), {
  onlyOnce: true
};
//code for fresh album ends here
window.userslist = [];

onChildAdded(ref(database, 'users/'), (snapshot) => {

  var childData2 = snapshot.key;
  var childData2 = snapshot.val();
  console.log(childData2.username)

  let div1 = document.createElement("div");
  let div2 = document.createElement("div");




  div1.className = 'friend';
  div1.innerHTML = "<h3>" + childData2.username + "</h3>"
  div2.className = 'friend-chat'
  // div2.type = 'chat-button'
  div2.type = 'button'
  div2.className = 'chat-button'
  div2.innerHTML = "chat now"
  //div2.onclick = window.location('chat.html',"_blank")
  div2.onclick = () => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // https://firebase.google.com/docs/reference/js/firebase.User
        //window.userid = user.uid;
        //console.log(userid); 
        window.open('./chat.html');
      }
      else {
        alert('USER NOT SIGNED IN')
      }
    });

  }
  document.querySelector(".friends-tab").appendChild(div1);
  // document.querySelector(".friend-info").appendChild(div2);
  div1.appendChild(div2);

})

//code for emoji by search starts here
document.getElementById("submit").addEventListener(('click'), (e) => {

  var text = document.getElementById("text").value;

  let hex = text.codePointAt(0).toString(16);

  if (hex == "1f600" || hex == "1f601" || hex == "1f604") {

    for (var t = 1; t <= mood.length; t++) {

      if (mood[t] == "happy") {

        console.log(songname[t]);

        let card = document.createElement("div");


        card.className = 'card';
        card.setAttribute("onclick", "playsong(" + t + ")");
        card.setAttribute("id", "" + t + "");
        card.style.backgroundImage = "url('" + imgsources[t] + "')";
        document.querySelector(".search-result-cards").appendChild(card);

      }

      else
        continue;
    }


  }
  else if (hex == "1f614" || hex == "1f61e" || hex == "1f622") {

    console.log("list of sad songs!")

    for (var t = 1; t <= mood.length; t++) {

      if (mood[t] == "sad") {

        console.log(songname[t]);

        let card = document.createElement("div");


        card.className = 'card';
        card.setAttribute("onclick", "playsong(" + t + ")");
        card.setAttribute("id", "" + t + "");
        card.style.backgroundImage = "url('" + imgsources[t] + "')";
        document.querySelector(".search-result-cards").appendChild(card);




        
      }

      else
        continue;
    }

  }

  else if (hex == "1f642") {
    console.log("list of neutral songs")

    for (var t = 1; t <= mood.length; t++) {

      if (mood[t] == "neutral") {

        console.log(songname[t]);

        let card = document.createElement("div");


        card.className = 'card';
        card.setAttribute("onclick", "playsong(" + t + ")");
        card.setAttribute("id", "" + t + "");
        card.style.backgroundImage = "url('" + imgsources[t] + "')";
        document.querySelector(".search-result-cards").appendChild(card);

      }

      else
        continue;
    }
  }

  else
    console.log("nothing to show")
});
//music controls code starts here

play.addEventListener('click', (e) => {

  var x = document.getElementById("myAudio");
  if (x.paused) { x.play(); }
  else { x.pause() };
})

next.addEventListener('click', (e) => {

  currentsongnumber++;
  if (currentsongnumber >= songsources.length) { currentsongnumber = 1; playsong(1); }
  else { playsong(currentsongnumber); }

})

previous.addEventListener('click', (e) => {

  currentsongnumber--;
  if (currentsongnumber < 1) { currentsongnumber = songsources.length - 1; playsong(currentsongnumber); }
  else { playsong(currentsongnumber); }

})

redo.addEventListener('click', (e) => {

  playsong(currentsongnumber)

})

//music control code ends here

//notification section starts here

function sad(usersname) {
  const newnotification = push(child(ref(database), 'notifications/')).key;
  set(ref(database, 'notifications/' + newnotification), {

    usersname: usersname
  })
}

//notification display

onChildAdded(ref(database, 'notifications/'), (snapshot) => {

  var childData2 = snapshot.key;
  var childData2 = snapshot.val();


  //if empty display something else code should start here
  //add a delete notification button
  if (childData2.usersname != myname) {
    let notification = document.createElement("div");
    notification.className = 'sec new';
    let notificationtext = document.createElement("div");
    notificationtext.className = 'txt'
    notificationtext.innerHTML = childData2.usersname + " is feeling down, would you like to cheer them up?!"
    notificationtext.onclick = function () {
      window.open('./chat.html');
    }
    document.querySelector(".cont").appendChild(notification);
    notification.appendChild(notificationtext)
  }


})


//recently played code starts here 
let j = 0;
window.checkingsongname = [];

onChildAdded(ref(database, 'recentlyplayed/'), (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    var childData1 = childSnapshot.val();
    let card = document.createElement("div");
    j++;
    card.className = 'card';
    card.setAttribute("onclick", "playsong(" + j + ")");
    card.setAttribute("id", "" + j + "");

    card.style.backgroundImage = "url('" + childData1.ImgUrl + "')";
    document.querySelector(".recently-played-cards").appendChild(card);
    checkingsongname[j] = childData1.SongName;
  })
})
//recently played code ends here
//recently played list update code starts here 
console.log(checkingsongname)
window.updaterecent = updaterecent;
window.currentsongnumber = 0;

function updaterecent(x, y, z, w) {

  var flag = null;

  if (checkingsongname.includes(x) == false) {
    const newPostKey = push(child(ref(database), 'recentlyplayed/' + userid)).key;

    update(ref(database, 'recentlyplayed/' + userid + '/' + newPostKey), {
      SongName: x,
      ArtistName: y,
      ImgUrl: z,
      SongUrl: w

    })
  } //recently played list update code ends here
}
var m = document.getElementById("myAudio");
var duration = m.duration;
function updateMusicProgressValue() {
  const progressBar = document.querySelector(".interactive-progress");
  progressBar.max = m.duration;
  progressBar.value = m.currentTime;
}
setInterval(updateMusicProgressValue, 700)

window.playsong = playsong;

//now playing section code starts here
function playsong(index) {

  console.log("playing" + index);
  document.querySelector(".song-thumbnail").style.backgroundImage = "url('" + imgsources[index] + "')";
  document.querySelector(".song").src = songsources[index];
  document.querySelector(".song-name").innerHTML = songname[index];
  document.querySelector(".artist-name").innerHTML = artistname[index];

  updaterecent(songname[index], artistname[index], imgsources[index], songsources[index]);

  currentsongnumber = index;
}

// MODAL OPENING AND CLOSING
document.getElementById("modal-close-button").addEventListener("click", function(){
    document.getElementById("camera-modal").classList.toggle("active");
})

document.getElementById("camera-button").addEventListener("click", function(){
    document.getElementById("camera-modal").classList.toggle("active");

   Webcam.set({
         
         image_format: 'jpeg',
         jpeg_quality: 90
      });
      Webcam.attach( '#my_camera' );
   
    }) 



document.getElementById("snapshot").addEventListener("click", function(){
  
Webcam.snap( function(data_uri) {
    // display results in page
    document.getElementById('results').innerHTML = 
        '<img id="imageprev" src="'+data_uri+'"/>';
   //document.querySelector(".cam").src = data_uri;
        //console.log(data_uri)
      window.data = data_uri
  } );

  Webcam.reset();
   
})

<<<<<<< HEAD
// SEARCH BAR APPEAR AND DISAPPEAR ON NAV-LINK CLICK
document.getElementById("search-navlink").addEventListener("click", function(){
  document.getElementById("search-bar").classList.toggle("active");
})



=======
document.getElementById("search").addEventListener("click",function() {

  //var base64image = document.getElementById("imageprev").src;
      
      (async () => {
    await faceapi.nets.ssdMobilenetv1.loadFromUri('./models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('./models');
    await faceapi.nets.faceExpressionNet.loadFromUri('./models');
    
    const image = document.querySelector('img')
    const canvas = faceapi.createCanvasFromMedia(image);
    const detection = await faceapi.detectSingleFace(image)
                                    .withFaceLandmarks()
                                    .withFaceExpressions();

    const dimensions = {
        width: image.width,
        height: image.height
    };
    
    console.log(detection);
    const resizedDimensions = faceapi.resizeResults(detection, dimensions);

    //document.body.append(canvas);
    document.getElementById('results').append(canvas);
    const expressions = resizedDimensions.expressions;
    console.log(expressions);
    const maxValue = Math.max(...Object.values(expressions));
      const emotion = Object.keys(expressions).filter(
        item => expressions[item] === maxValue
      );

      console.log(emotion[0]);
    faceapi.draw.drawDetections(canvas, resizedDimensions);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDimensions);
    faceapi.draw.drawFaceExpressions(canvas, resizedDimensions);

    //document.getElementById('results').innerHTML = 
       // '<img id="imageprev" src="'+canvas+'"/>';

       // document.getElementById("myImage").src = 'img/new-image.jpg';
})();


  
})


<<<<<<< HEAD
=======
   
>>>>>>> 402c2bd5487f1465c1ce7e9b57d03b7fec7095f0
>>>>>>> b142e048e298c4a42e11566b48775c1008c93d88
