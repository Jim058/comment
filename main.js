      
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAu8TgJ_oncGLpv42WN28WOdp8rCDF4U7Y",
    authDomain: "tast20221222.firebaseapp.com",
    databaseURL: "https://tast20221222-default-rtdb.firebaseio.com",
    projectId: "tast20221222",
    storageBucket: "tast20221222.appspot.com",
    messagingSenderId: "1076445701935",
    appId: "1:1076445701935:web:9aa5121ff060609ac263da",
    measurementId: "G-QL4HJH5RZY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import {get, ref, set, child, update, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const db = getDatabase();
console.log(db)

let username = document.querySelector('.userInput >.name')
let usertext = document.querySelector('.userInput >.contentTxt')
let send = document.querySelector('.userInput >.btn')
let nameList = document.querySelector('ul') 
const newLi = document.createElement('li')

get(child(ref(getDatabase()),'/')).then((snapshot)=>{
    if (snapshot.exists()) {
        console.log(Object.values(snapshot.val())[1].user +'：' +Object.values(snapshot.val())[1].text);
        for(let j=0;j<=Object.keys(snapshot.val()).length;j++){
            const newLi = document.createElement('li');
            newLi.innerHTML = '<h2>'+Object.values(snapshot.val())[j].user+'</h2><div class="line"></div><P>'+Object.values(snapshot.val())[j].text+'</P>'
             
            /*Object.keys(snapshot.val())[j] + Object.values(snapshot.val())[j]*/
            nameList.appendChild(newLi)
        }
            
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
}) 


send.addEventListener('click',function(){
    console.log(username.value+'留言:'+usertext.value)

    let newli = document.createElement('li')
    let user = username.value
    let text = usertext.value
    /*newli.innerHTML = '<h2>'+username.value+'</h2><div class="line"></div><P>'+usertext.value+'</P>'
    document.querySelector('.comment').appendChild(newli)*/

    update(ref(db, username.value), {
        user : user,
        text : text
    })
    .then (()=>{
        //Data saved successfully
        newli.innerHTML = '<h2>'+username.value+'</h2><div class="line"></div><P>'+usertext.value+'</P>'
        document.querySelector('.comment').appendChild(newli)
        
    })
    .catch((error)=>{
        //error
        console.log('fail')
    })
})


/*send.addEventListener('click',function(){
    let newli = document.createElement('li')
    
    newli.innerHTML = '<h2>'+username.value+'</h2><div class="line"></div><P>'+usertext.value+'</P>'
    document.querySelector('.comment').appendChild(newli)
})
*/