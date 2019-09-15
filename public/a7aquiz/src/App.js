import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as firebase from "firebase";
import { withGetScreen } from "react-getscreen";
import next from "./images/next.png";
import back from "./images/back.png";
import { Helmet } from "react-helmet";
import logo from './images/A7A_CIRCLE.jpg';
import { toASCII } from "punycode";

import facebook from './images/facebook.png';
import discord from './images/discord.png';
import reddit from './images/reddit.png';
import instagram from './images/instagram.png';
import youtube from './images/youtube.png';
import domain from './images/domain.png';

import sharda from './images/sharda.jpeg';
import shardasmall from './images/shardasmall.jpg';
import A7ABIG from './images/A7A_CIRCLE.jpg';
import mindfizz from './images/mindfizz.jpeg';
import turing from './images/turing.jpeg';

import Countdown from 'react-countdown-now';



let length = 0;
let usersLength = 0;
let temp = [];
let selected;
let selectedOpt;
let selectedApt;
let selectedAptOpt;
let clickedOnce = false;
let UID;
let SC_PROGRAMMING = 0;
let C_PROGRAMMING = 0;
let W_PROGRAMMING = 0;

let SC_APTITUDE = 0;
let C_APTITUDE = 0;
let W_APTITUDE = 0;


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {}, seconds: 3600 ,
      
      totalScore: 0,
      currentScore: 0,
      correct: 0,
      wrong: 0,
      questions: [],
      Aptquestions: [],
      leaderboard: [],
      currentIndex: 0,
      currentIndexApt:0,
      det: false,
      userLoggedIn:false,
      plang:"",
      currentQuestion:1,
      signedIn:"LOGIN"
      
    };

    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);

    
   

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        

       
     

        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
       // console.log(user);
        // document.getElementById("signbutton").style.display = "none";
        // document.getElementById("profiletag").style.visibility = "visible";
        // document.getElementById("username").innerHTML = displayName;
        // document.getElementById("dp").src = user.photoURL;

        // ...
      } else {
        // User is signed out.
        // ...
        // document.getElementById("signbutton").style.visibility = "visible";
        // document.getElementById("profiletag").style.display = "none";
      }
    });
  }

//    startTimer(duration) {
//     var timer = duration, minutes, seconds;
//     setInterval(function () {
//         minutes = parseInt(timer / 60, 10);
//         seconds = parseInt(timer % 60, 10);

//         minutes = minutes < 10 ? "0" + minutes : minutes;
//         seconds = seconds < 10 ? "0" + seconds : seconds;

//         var dis = document.getElementById("timeleft").innerHTML;
//         console.log(dis);
//         dis.innerHTML = minutes + ":" + seconds;

//         if (--timer < 0) {
//             timer = duration;
//         }
//     }, 1000);

//     this.startTimer(duration);
// }



 

  check() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        UID = uid;
    //    console.log(user);

        // ...
      } else {
        // User is signed out.
        // ...
      }
    });
  }


   getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  
   initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');
  
    function updateClock() {
      var t = this.getTimeRemaining(endtime);
  
      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
  
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }
  
    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }
  
  

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds == 0) { 
      clearInterval(this.timer);

      this.submitProgrammingQuiz();
     // this.submitAptitude();
    }
  }


  componentDidMount() {

    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {



        var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
        this.initializeClock('clockdiv', deadline);
        // var fiveMinutes = 60 * 5,
        // display = document.getElementById('timeleft');
        // this.startTimer(fiveMinutes);
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        UID = uid;
        firebase
          .database()
          .ref()
          .child("leaderboard1")
          .child(uid)
          .set({
            points: 0,
            name: firebase.auth().currentUser.displayName,
            dp: firebase.auth().currentUser.photoURL
          });

    //    console.log(user);

        // ...


       

      } else {
        // User is signed out.
        // ...
      }
    });
    const rootRef = firebase.database().ref();
    const speedRef = rootRef.child("quiz1");

    speedRef.orderByChild('cat')
    .equalTo(this.state.plang).on("value", snap => {
      let questions = snap.val();
      let newState = [];
      for (let x in questions) {
        newState.push({
          id: x,
          op1: questions[x].op1,
          op2: questions[x].op2,
          op3: questions[x].op3,
          op4: questions[x].op4,
          q: questions[x].question,
          answer: questions[x].answer
        });
        length = length + 1;
     //   console.log(length);
      }

      length = newState.length;

      this.setState({
        questions: newState
      });
    });

    const leaderboardq = rootRef.child("leaderboard1");

    leaderboardq.on("value", snap => {
      let leaderboards = snap.val();
      let newStateLeaderboard = [];
      for (let x in leaderboards) {
     //   console.log(leaderboards[x].points);
        newStateLeaderboard.push({
          name: leaderboards[x].name,
          dp: leaderboards[x].dp,
          id: x,
          points: leaderboards[x].points
        });
        usersLength = usersLength + 1;
       // console.log(usersLength);
      }

      usersLength = newStateLeaderboard.usersLength;

      this.setState({
        leaderboard: newStateLeaderboard
      });

      //console.log(this.state.leaderboard);
    });





  }

  setAnswer(event) {
    selected = event.target.value;
    selectedOpt = event.target.id;

    //console.log(selected);
  }


  setAnswerAptitude(event) {
    selectedApt = event.target.value;
    selectedAptOpt = event.target.id;
    //console.log(selectedApt);
  }

  submitAnswer(id) {

    document.getElementById("subAndNextProgrammingButton").style.backgroundColor="green";
    // if(this.state.currentIndex > 11){

    //   this.setState({currentQuestion:this.state.currentQuestion+1});
    //   console.log(this.state.currentQuestion);
    
    // console.log("This is of apt")
    
    // document.getElementById("btn").style.visibility = "hidden";
    // clickedOnce = true;
    // console.log("slected: " , selectedApt);
    // let that = this;
    // let a = selectedApt;
    // console.log(this.state.currentIndex);
    // let q = this.state.currentIndex;
    // console.log("/quiz1/" + "Aptitude" + "/" + (id));
    // firebase
    //   .database()
    //   .ref("quiz1/Aptitude/" + (id))
    //   .once("value")
    //   .then(function(snap) {
    //     console.log("this is here aptitude")
    //     console.log(snap.val().answer);
    //     if (a === snap.val().answer) {
    //       console.log("slected was : " + a);
    //       console.log("correct is", snap.val().answer)
    //       let cc = that.state.currentScore + 3;
    //       let cr = that.state.correct + 1;

    //       that.setState({
    //         currentScore: cc,
    //         correct: cr
    //       });

    //       //NEXT QUESTION

    //       //console.log(firebase.auth().currentUser.uid);
    //       var userRef = firebase
    //         .database()
    //         .ref()
    //         .child("leaderboard1")
    //         .child(firebase.auth().currentUser.uid)
    //         .child("points");

    //       userRef.transaction(function(points) {
    //         return points + 3;
    //       });

    //      // console.log("ho");
    //       let c = that.state.currentIndex + 1;
    //       if (c < length) {
    //         document.getElementById("btn").style.visibility = "visible";

    //         that.setState({
    //           currentIndex: c
    //         });
    //         document.getElementById("o1").checked = false;
    //         document.getElementById("o2").checked = false;
    //         document.getElementById("o3").checked = false;
    //         document.getElementById("o4").checked = false;
    //       }
    //     } 
    //     else {
    //       console.log(firebase.auth().currentUser.uid);
    //       var userRef = firebase
    //         .database()
    //         .ref()
    //         .child("leaderboard1")
    //         .child(firebase.auth().currentUser.uid)
    //         .child("points");

    //       userRef.transaction(function(points) {
    //         return points - 1;
    //       });

    //       // document.getElementById("div1").style.backgroundColor = "#b71c1c";
    //       // document.getElementById("div2").style.backgroundColor = "#b71c1c";

    //       // setInterval(function() {
    //       //   document.getElementById("div1").style.backgroundColor = "#F06292";
    //       //   document.getElementById("div2").style.backgroundColor = "#F06292";
    //       // }, 500);

    //       let cr = that.state.wrong + 1;
    //       let curScoreWrong = that.state.currentScore - 1;
    //       that.setState({
    //         wrong: cr,
    //         currentScore: curScoreWrong
    //       });

    //       //NEXT QUESTION

    //       console.log("ho");
    //       let c = that.state.currentIndex + 1;
    //       if (c < length) {
    //         document.getElementById("btn").style.visibility = "visible";

    //         that.setState({
    //           currentIndex: c
    //         });
    //         document.getElementById("o1").checked = false;
    //         document.getElementById("o2").checked = false;
    //         document.getElementById("o3").checked = false;
    //         document.getElementById("o4").checked = false;
    //       }
    //     }
    //   }).catch(function(c){
    //     console.log(c);
    //     alert("You are not permitted apt");
    //   });
    // }

   // this.state.questions.splice(this.state.currentIndex, 1);

   

      //console.log("This is of non apt")

    
      console.log(this.state.questions);
      let that  = this;

      this.setState({currentQuestion:this.state.currentQuestion+1});
      this.state.questions[this.state.currentIndex].selectedOption = selected;
      this.state.questions[this.state.currentIndex].attempt = true;
        firebase
      .database()
      .ref("/quiz1/" + this.state.plang + "/" + (id))
      .once("value")
      .then(function(snap) {
       // console.log(snap.val().answer);
        if (selected === snap.val().answer) {
          that.state.questions[that.state.currentIndex].correct = true;
        
        }

        else {
          that.state.questions[that.state.currentIndex].correct = false;

        }
        });

    //  document.getElementById(selectedOpt).style.backgroundColor="green";


     
    //   //console.log(this.state.currentQuestion);
    
    // document.getElementById("btn").style.visibility = "hidden";
    // clickedOnce = true;
    // //console.log("slected: " , selected);
    // let that = this;
    // let a = selected;
    // //console.log(this.state.currentIndex);
    // let q = this.state.currentIndex;
    // //console.log("/quiz1/" + this.state.plang + "/" + (id));

    // if(this.state.questions[this.state.currentIndex].attempt){


    //   if(this.state.questions[this.state.currentIndex].correct){
    //   //  console.log(that.state.currentScore);
    //     let cc = that.state.currentScore -3;
    //     let cr = that.state.correct - 1;

    //     that.setState({
    //       currentScore: cc,
    //       correct: cr
    //     });

    //     //console.log(that.state.currentScore);
    //     that.state.questions[that.state.currentIndex].selectedOption = selected;

    //   firebase
    //   .database()
    //   .ref("/quiz1/" + this.state.plang + "/" + (id))
    //   .once("value")
    //   .then(function(snap) {
    //    // console.log(snap.val().answer);
    //     if (a === snap.val().answer) {
    //       that.state.questions[that.state.currentIndex].correct = true;
    //       //console.log("slected was : " + a);
    //       //console.log("correct is", snap.val().answer)
    //       let cc = that.state.currentScore + 3;
    //       let cr = that.state.correct + 1;

    //       that.setState({
    //         currentScore: cc,
    //         correct: cr
    //       });

    //       //NEXT QUESTION

    //       //console.log(firebase.auth().currentUser.uid);
    //       var userRef = firebase
    //         .database()
    //         .ref()
    //         .child("leaderboard1")
    //         .child(firebase.auth().currentUser.uid)
    //         .child("points");

    //       userRef.transaction(function(points) {
    //         return points + 3;
    //       });

    //      // console.log("ho");
    //       let c = that.state.currentIndex + 1;
    //       if (c < length) {
    //         document.getElementById("btn").style.visibility = "visible";

    //         that.setState({
    //           currentIndex: c
    //         });
    //         document.getElementById("o1").checked = false;
    //         document.getElementById("o2").checked = false;
    //         document.getElementById("o3").checked = false;
    //         document.getElementById("o4").checked = false;
    //       }
    //     } else {
    //       //console.log(firebase.auth().currentUser.uid);
    //       var userRef = firebase
    //         .database()
    //         .ref()
    //         .child("leaderboard1")
    //         .child(firebase.auth().currentUser.uid)
    //         .child("points");

    //       userRef.transaction(function(points) {
    //         return points - 1;
    //       });

    //       // document.getElementById("div1").style.backgroundColor = "#b71c1c";
    //       // document.getElementById("div2").style.backgroundColor = "#b71c1c";

    //       // setInterval(function() {
    //       //   document.getElementById("div1").style.backgroundColor = "#F06292";
    //       //   document.getElementById("div2").style.backgroundColor = "#F06292";
    //       // }, 500);

    //       let cr = that.state.wrong + 1;
    //       let curScoreWrong = that.state.currentScore - 1;
    //       that.setState({
    //         wrong: cr,
    //         currentScore: curScoreWrong
    //       });

    //       //NEXT QUESTION

    //       //console.log("ho");
    //       let c = that.state.currentIndex + 1;
    //       if (c < length) {
    //         document.getElementById("btn").style.visibility = "visible";

    //         that.setState({
    //           currentIndex: c
    //         });
    //         document.getElementById("o1").checked = false;
    //         document.getElementById("o2").checked = false;
    //         document.getElementById("o3").checked = false;
    //         document.getElementById("o4").checked = false;
    //       }
    //     }
    //   }).catch(function(c){
    //     //console.log(c);
    //     alert("You are not permitted");
    //   });
    //   }

    //  // alert("Already attempted this one");  
     
    // }

    // else {
    //   //console.log(this.state.questions);
    //   this.state.questions[this.state.currentIndex].attempt = true;
    //   //console.log(this.state.questions);
    
    // firebase
    //   .database()
    //   .ref("/quiz1/" + this.state.plang + "/" + (id))
    //   .once("value")
    //   .then(function(snap) {
    //     //console.log(snap.val().answer);
    //     if (a === snap.val().answer) {
    //       that.state.questions[that.state.currentIndex].correct = true;
    //       //console.log("slected was : " + a);
    //       //console.log("correct is", snap.val().answer)
    //       let cc = that.state.currentScore + 3;
    //       let cr = that.state.correct + 1;

    //       that.setState({
    //         currentScore: cc,
    //         correct: cr
    //       });

    //       //NEXT QUESTION

    //       //console.log(firebase.auth().currentUser.uid);
    //       var userRef = firebase
    //         .database()
    //         .ref()
    //         .child("leaderboard1")
    //         .child(firebase.auth().currentUser.uid)
    //         .child("points");

    //       userRef.transaction(function(points) {
    //         return points + 3;
    //       });

    //      // console.log("ho");
    //       let c = that.state.currentIndex + 1;
    //       if (c < length) {
    //         document.getElementById("btn").style.visibility = "visible";

    //         that.setState({
    //           currentIndex: c
    //         });
    //         document.getElementById("o1").checked = false;
    //         document.getElementById("o2").checked = false;
    //         document.getElementById("o3").checked = false;
    //         document.getElementById("o4").checked = false;
    //       }
    //     } else {
    //       //console.log(firebase.auth().currentUser.uid);
    //       var userRef = firebase
    //         .database()
    //         .ref()
    //         .child("leaderboard1")
    //         .child(firebase.auth().currentUser.uid)
    //         .child("points");

    //       userRef.transaction(function(points) {
    //         return points - 1;
    //       });

    //       // document.getElementById("div1").style.backgroundColor = "#b71c1c";
    //       // document.getElementById("div2").style.backgroundColor = "#b71c1c";

    //       // setInterval(function() {
    //       //   document.getElementById("div1").style.backgroundColor = "#F06292";
    //       //   document.getElementById("div2").style.backgroundColor = "#F06292";
    //       // }, 500);

    //       let cr = that.state.wrong + 1;
    //       let curScoreWrong = that.state.currentScore - 1;
    //       that.setState({
    //         wrong: cr,
    //         currentScore: curScoreWrong
    //       });

    //       //NEXT QUESTION

    //       //console.log("ho");
    //       let c = that.state.currentIndex + 1;
    //       if (c < length) {
    //         document.getElementById("btn").style.visibility = "visible";

    //         that.setState({
    //           currentIndex: c
    //         });
    //         document.getElementById("o1").checked = false;
    //         document.getElementById("o2").checked = false;
    //         document.getElementById("o3").checked = false;
    //         document.getElementById("o4").checked = false;
    //       }
    //     }
    //   }).catch(function(c){
    //     //console.log(c);
    //     alert("You are not permitted");
    //   });
    // }
    
  }


  submitAnswerApt(id){
    //console.log("This is of apt")

    document.getElementById("subAndNextAptitudeButton").style.backgroundColor="green";
    this.state.Aptquestions[this.state.currentIndexApt].selectedOption = selectedApt;
    console.log(this.state.Aptquestions);

   // document.getElementById(selectedAptOpt).style.backgroundColor="green";


    this.setState({currentQuestion:this.state.currentQuestion+1});

    let that = this;

    this.state.questions[this.state.currentIndexApt].attempt = true;
        firebase
      .database()
      .ref("/quiz1/Aptitude/" + (id))
      .once("value")
      .then(function(snap) {
       // console.log(snap.val().answer);
        if (selectedApt === snap.val().answer) {
          that.state.Aptquestions[that.state.currentIndexApt].correct = true;
        
        }

        else {
          that.state.Aptquestions[that.state.currentIndexApt].correct = false;

        }
        });
    //console.log(this.state.currentQuestion);
  
  // document.getElementById("btn").style.visibility = "hidden";
  // clickedOnce = true;
  // //console.log("slected: " , selectedApt);
  // let that = this;
  // let a = selectedApt;
  // //console.log(this.state.currentIndexApt);
  // let q = this.state.currentIndexApt;

  // if(this.state.Aptquestions[this.state.currentIndexApt].attempt){


  //   if(this.state.Aptquestions[this.state.currentIndexApt].correct){
  //   //  console.log(that.state.currentScore);
  //     let cc = that.state.currentScore -3;
  //     let cr = that.state.correct - 1;

  //     that.setState({
  //       currentScore: cc,
  //       correct: cr
  //     });

  //     //console.log(that.state.currentScore);
  //   firebase
  //   .database()
  //   .ref("quiz1/Aptitude/"  + (id))
  //       .once("value")
  //   .then(function(snap) {
  //     //console.log(snap.val().answer);
  //     if (a === snap.val().answer) {
  //       that.state.Aptquestions[that.state.currentIndexApt].correct = true;
  //       //console.log("slected was : " + a);
  //       //console.log("correct is", snap.val().answer)
  //       let cc = that.state.currentScore + 3;
  //       let cr = that.state.correct + 1;

  //       that.setState({
  //         currentScore: cc,
  //         correct: cr
  //       });

  //       //NEXT QUESTION

  //       //console.log(firebase.auth().currentUser.uid);
  //       var userRef = firebase
  //         .database()
  //         .ref()
  //         .child("leaderboard1")
  //         .child(firebase.auth().currentUser.uid)
  //         .child("points");

  //       userRef.transaction(function(points) {
  //         return points + 3;
  //       });

  //      // console.log("ho");
  //       let c = that.state.currentIndexApt + 1;
  //       if (c < length) {
  //         document.getElementById("btn").style.visibility = "visible";

  //         that.setState({
  //           currentIndexApt: c
  //         });
  //         document.getElementById("oa1").checked = false;
  //         document.getElementById("oa2").checked = false;
  //         document.getElementById("oa3").checked = false;
  //         document.getElementById("oa4").checked = false;
  //       }
  //     } else {
  //       //console.log(firebase.auth().currentUser.uid);
  //       var userRef = firebase
  //         .database()
  //         .ref()
  //         .child("leaderboard1")
  //         .child(firebase.auth().currentUser.uid)
  //         .child("points");

  //       userRef.transaction(function(points) {
  //         return points - 1;
  //       });

  //       // document.getElementById("div1").style.backgroundColor = "#b71c1c";
  //       // document.getElementById("div2").style.backgroundColor = "#b71c1c";

  //       // setInterval(function() {
  //       //   document.getElementById("div1").style.backgroundColor = "#F06292";
  //       //   document.getElementById("div2").style.backgroundColor = "#F06292";
  //       // }, 500);

  //       let cr = that.state.wrong + 1;
  //       let curScoreWrong = that.state.currentScore - 1;
  //       that.setState({
  //         wrong: cr,
  //         currentScore: curScoreWrong
  //       });

  //       //NEXT QUESTION

  //       //console.log("ho");
  //       let c = that.state.currentIndexApt + 1;
  //       if (c < length) {
  //         document.getElementById("btn").style.visibility = "visible";

  //         that.setState({
  //           currentIndexApt: c
  //         });
  //         document.getElementById("oa1").checked = false;
  //         document.getElementById("oa2").checked = false;
  //         document.getElementById("oa3").checked = false;
  //         document.getElementById("oa4").checked = false;
  //       }
  //     }
  //   }).catch(function(c){
  //     //console.log(c);
  //     alert("You are not permitted");
  //   });
  //   }

  //  // alert("Already attempted this one");  
   
  // }

  // else {
  //   //console.log(this.state.Aptquestions);
  //   this.state.Aptquestions[this.state.currentIndexApt].attempt = true;
  //   //console.log(this.state.Aptquestions);
  
  // firebase
  //   .database()
  //   .ref("quiz1/Aptitude/"  + (id))
  //   .once("value")
  //   .then(function(snap) {
  //     //console.log(snap.val().answer);
  //     if (a === snap.val().answer) {
  //       //console.log("Answer is :" +snap.val().answer);
  //       that.state.Aptquestions[that.state.currentIndexApt].correct = true;

  //       //console.log("slected was : " + a);
  //       //console.log("correct is", snap.val().answer)
  //       let cc = that.state.currentScore + 3;
  //       let cr = that.state.correct + 1;

  //       that.setState({
  //         currentScore: cc,
  //         correct: cr
  //       });

  //       //NEXT QUESTION

  //       //console.log(firebase.auth().currentUser.uid);
  //       var userRef = firebase
  //         .database()
  //         .ref()
  //         .child("leaderboard1")
  //         .child(firebase.auth().currentUser.uid)
  //         .child("points");

  //       userRef.transaction(function(points) {
  //         return points + 3;
  //       });

  //      // console.log("ho");
  //       let c = that.state.currentIndexApt + 1;
  //       if (c < length) {
  //         document.getElementById("btn").style.visibility = "visible";

  //         that.setState({
  //           currentIndexApt: c
  //         });
  //         document.getElementById("oa1").checked = false;
  //         document.getElementById("oa2").checked = false;
  //         document.getElementById("oa3").checked = false;
  //         document.getElementById("oa4").checked = false;
  //       }
  //     } else {
  //       //console.log(firebase.auth().currentUser.uid);
  //       var userRef = firebase
  //         .database()
  //         .ref()
  //         .child("leaderboard1")
  //         .child(firebase.auth().currentUser.uid)
  //         .child("points");

  //       userRef.transaction(function(points) {
  //         return points - 1;
  //       });

  //       // document.getElementById("div1").style.backgroundColor = "#b71c1c";
  //       // document.getElementById("div2").style.backgroundColor = "#b71c1c";

  //       // setInterval(function() {
  //       //   document.getElementById("div1").style.backgroundColor = "#F06292";
  //       //   document.getElementById("div2").style.backgroundColor = "#F06292";
  //       // }, 500);

  //       let cr = that.state.wrong + 1;
  //       let curScoreWrong = that.state.currentScore - 1;
  //       that.setState({
  //         wrong: cr,
  //         currentScore: curScoreWrong
  //       });

  //       //NEXT QUESTION

  //       //console.log("ho");
  //       let c = that.state.currentIndexApt + 1;
  //       if (c < length) {
  //         document.getElementById("btn").style.visibility = "visible";

  //         that.setState({
  //           currentIndexApt: c
  //         });
  //         document.getElementById("oa1").checked = false;
  //         document.getElementById("oa2").checked = false;
  //         document.getElementById("oa3").checked = false;
  //         document.getElementById("oa4").checked = false;
  //       }
  //     }
  //   }).catch(function(c){
  //     //console.log(c);
  //     alert("You are not permitted");
  //   });
  // }
  
  }

  signin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    let that = this;
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        //console.log(user);
        // ...

        that.setState({signedIn:"CONTINUE"})
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }


  updateDetails(){
    
    var e = document.getElementById("lang");
    var strUser = e.options[e.selectedIndex].value;
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var sysid = document.getElementById("sysid").value;
    var that = this;
    if(fname!="" && lname!="" && sysid!="" && sysid.length == 10){
      var user = firebase.auth().currentUser;

      if (user) {
        //console.log(user.uid);
        //that.signin();
        that.setState({userLoggedIn:true});
        that.setState({signedIn:"CONTINUE"})
        firebase
        .database()
        .ref()
        .child("leaderboard1")
        .child(user.uid)
        .set({
          points: 0,
          name: firebase.auth().currentUser.displayName,
          dp: firebase.auth().currentUser.photoURL,
          firstname : fname,
          lastname : lname,
          language : strUser,
          sysid : sysid,
          APTITUDE_POINTS : 0,
          PROGRAMMING_POINTS: 0,
          email : user.email
        }).then(function(val){
          that.setState({
            det : true,
            plang:strUser
          });

          document.getElementById("signbutton").style.display = "none";
          document.getElementById("profiletag").style.visibility = "visible";
          document.getElementById("username").innerHTML = fname + " " +lname + "<br/>" + "System id : " + sysid + "<br/>" + "Programming language: " + strUser;
          document.getElementById("dp").src = user.photoURL;

         

    const rootRef = firebase.database().ref();

    const speedRef = rootRef.child("quiz1/"+that.state.plang);

    speedRef.on("value", snap => {
      let questions = snap.val();
      let newState = [];
      let randomList = [];
      for (let x in questions) {
        newState.push({
          id: x,
          op1: questions[x].op1,
          op2: questions[x].op2,
          op3: questions[x].op3,
          op4: questions[x].op4,
          q: questions[x].question,
          answer: questions[x].answer,
          attempt : false,
          correct : false,
          selectedOption : ""
        });
        length = length + 1;
        //console.log(length);

      }

      length = newState.length;
      randomList = that.shuffle(newState);

      that.setState({
        questions: randomList
      });

      //console.log(questions);
    });



    const speed = rootRef.child("quiz1/"+"Aptitude");

    speed.on("value", snap => {
      let Aptquestions = snap.val();
      let newState = [];
      let randomList = [];
      for (let x in Aptquestions) {
        newState.push({
          id: x,
          op1: Aptquestions[x].op1,
          op2: Aptquestions[x].op2,
          op3: Aptquestions[x].op3,
          op4: Aptquestions[x].op4,
          q: Aptquestions[x].question,
          answer: Aptquestions[x].answer,
          attempt : false,
          correct : false,
          selectedOption : ""
        });
        length = length + 1;
        //console.log(length);

      }

      length = newState.length;
      randomList = that.shuffleApt(newState);

      that.setState({
        Aptquestions: randomList
      });
     // console.log(Aptquestions);
    });



    const leaderboardq = rootRef.child("leaderboard1");

    leaderboardq.on("value", snap => {
      let leaderboards = snap.val();
      let newStateLeaderboard = [];
      for (let x in leaderboards) {
       // console.log(leaderboards[x].points);
        newStateLeaderboard.push({
          name: leaderboards[x].name,
          dp: leaderboards[x].dp,
          id: x,
          points: leaderboards[x].points
        });
        usersLength = usersLength + 1;
        //console.log(usersLength);
      }

      usersLength = newStateLeaderboard.usersLength;

      that.setState({
        leaderboard: newStateLeaderboard
      });

      that.startTimer();
     // console.log(that.state.leaderboard);
    });

        }).catch(function(c){
          alert("Something went wrong, please try again")
        });

      } else {
        // document.getElementById("signbutton").style.visibility = "visible";
        // document.getElementById("profiletag").style.display = "none";
        that.signin();
        
      }
    }

    else {
      alert("Invalid entry.")
    }

    //console.log(strUser, fname, lname, sysid);
    
  }



   myFunction() {
    setInterval(function(){ console.log("Hello"); }, 3000);
  }

  submitAptitude(){
    document.getElementById("aptitude").style.display = "none";
    document.getElementById("afterAptitude").style.display = "block";



    let that = this;
    this.state.Aptquestions.forEach(function(m){
      if(m.selectedOption === m.answer){
        console.log("true");
        let cc = that.state.totalScore + 3;
        SC_APTITUDE = SC_APTITUDE + 3;
        C_APTITUDE = C_APTITUDE + 1;


      
        console.log("this is total score of true: "+SC_APTITUDE);

      }

      else if(m.selectedOption === ""){
        console.log("blank options");
      }

      else {
        let cc = that.state.totalScore - 1;
        SC_APTITUDE = SC_APTITUDE - 1;
        W_APTITUDE = W_APTITUDE + 1;
       
        console.log("this is total score false: "+SC_APTITUDE);

      }

     // console.log(m.selectedOption);
     // console.log(m.answer);

     var userRef = firebase
     .database()
     .ref()
     .child("leaderboard1")
     .child(firebase.auth().currentUser.uid)
     .child("APTITUDE_POINTS");

   userRef.transaction(function(points) {
     return SC_APTITUDE;
   });

    });

    var programmingref = firebase
  .database()
  .ref()
  .child("leaderboard1")
  .child(firebase.auth().currentUser.uid)
  .child("APTITUDE_ARRAY");

  programmingref.set(this.state.Aptquestions);

 // firebase.auth().signOut(); this.setState({userLoggedIn:false});
  }

  

  submitProgrammingQuiz(){
    document.getElementById("programming").style.display = "none";
    document.getElementById("afterProgramming").style.display = "block";
    document.getElementById("upperLogoutButton").style.display="none";
    console.log("here")
    let that = this;
    this.state.questions.forEach(function(m){
      if(m.selectedOption === m.answer){
        console.log("true");
        let cc = that.state.totalScore + 3;
        SC_PROGRAMMING = SC_PROGRAMMING + 3;
        C_PROGRAMMING = C_PROGRAMMING + 1;


        that.setState({
          totalScore: cc,
          //correct: cr
        });

        console.log("this is total score of true: "+SC_PROGRAMMING);

      }

      else if(m.selectedOption === ""){
        console.log("blank options");
      }

      else {
        let cc = that.state.totalScore - 1;
        SC_PROGRAMMING = SC_PROGRAMMING - 1;
        W_PROGRAMMING = W_PROGRAMMING + 1;
        that.setState({
          totalScore: cc,
          //correct: cr
        });

        console.log("this is total score false: "+SC_PROGRAMMING);

      }



    });
    console.log("this is total score: "+this.state.totalScore);

    var userRef = firebase
    .database()
    .ref()
    .child("leaderboard1")
    .child(firebase.auth().currentUser.uid)
    .child("PROGRAMMING_POINTS");

  userRef.transaction(function(points) {
    return SC_PROGRAMMING;
  });

  var programmingref = firebase
  .database()
  .ref()
  .child("leaderboard1")
  .child(firebase.auth().currentUser.uid)
  .child("PROGRAMMING_ARRAY");

  programmingref.set(this.state.questions);

  //firebase.auth().signOut(); this.setState({userLoggedIn:false});
  
  }

  nextQuestion() {
  
    //console.log("ho");
    console.log(typeof this.state.currentIndex);


    document.getElementById("subAndNextProgrammingButton").style.backgroundColor="#26A69A"
  
    
    let c = this.state.currentIndex + 1;

    
    if (c < length) {
      document.getElementById("btn").style.visibility = "visible";

      let that = this;
      that.setState({
        currentIndex: c
      });

      if(this.state.currentIndex+1==39){
        console.log(this.state.currentIndex);
        document.getElementById("nextProgrammingButton").style.visibility = "hidden" ;
      }

        else{
          document.getElementById("nextProgrammingButton").style.visibility = "visible" ;
        }
      


      document.getElementById("o1").checked = false;
      document.getElementById("o2").checked = false;
      document.getElementById("o3").checked = false;
      document.getElementById("o4").checked = false;
    }

    

    //console.log(this.state.currentIndex);
    //console.log(this.state.questions);
  }

  previousQuestion() {
    document.getElementById("subAndNextProgrammingButton").style.backgroundColor="#26A69A"

    //console.log("ho");
    let c = this.state.currentIndex - 1;
    if (c >= 0) {
      let that = this;
      that.setState({
        currentIndex: c
      });

      document.getElementById("o1").checked = false;
      document.getElementById("o2").checked = false;
      document.getElementById("o3").checked = false;
      document.getElementById("o4").checked = false;
    }

    document.getElementById("nextProgrammingButton").style.visibility = "visible" ;

    //console.log(this.state.currentIndex);
    //console.log(this.state.questions);
  }

  nextQuestionApt() {
    //document.getElementById(selectedAptOpt).style.backgroundColor="#90A4AE"
    document.getElementById("subAndNextAptitudeButton").style.backgroundColor="#26A69A"

    //console.log("ho");
    let c = this.state.currentIndexApt + 1;
    if (c < length) {
      document.getElementById("btn").style.visibility = "visible";

      let that = this;
      that.setState({
        currentIndexApt: c
      });

      if(this.state.currentIndexApt+1==9){
        console.log(this.state.currentIndex);
        document.getElementById("nextAptitudeButton").style.visibility = "hidden" ;
      }

      else{
        document.getElementById("nextAptitudeButton").style.visibility = "visible" ;
      }
      document.getElementById("oa1").checked = false;
      document.getElementById("oa2").checked = false;
      document.getElementById("oa3").checked = false;
      document.getElementById("oa4").checked = false;
    }

    //console.log(this.state.currentIndexApt);
    //console.log(this.state.Aptquestions);
  }

  previousQuestionApt() {
    document.getElementById("subAndNextAptitudeButton").style.backgroundColor="#26A69A"

    //console.log("ho");
    let c = this.state.currentIndexApt - 1;
    if (c >= 0) {
      let that = this;
      that.setState({
        currentIndexApt: c
      });

      document.getElementById("oa1").checked = false;
      document.getElementById("oa2").checked = false;
      document.getElementById("oa3").checked = false;
      document.getElementById("oa4").checked = false;
    }

    document.getElementById("nextAptitudeButton").style.visibility = "visible" ;


   // console.log(this.state.currentIndexApt);
   // console.log(this.state.Aptquestions);
  }


  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array.slice(0, 40);
  }


  logoutWithoutSaving(){
    firebase.auth().signOut(); this.setState({userLoggedIn:false});
    
  }

  logout(){
    this.submitProgrammingQuiz();
    this.submitAptitude();
   firebase.auth().signOut(); this.setState({userLoggedIn:false});
  }

  shuffleApt(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array.slice(0, 10);
  }

  render() {
    return this.state.det && this.state.userLoggedIn ? (
      <div
        id="div1"
        className="App"
        style={{ backgroundColor: "#F06292", height: "100%" }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <div
                style={{
                  background: "#000",
                  borderBottomRightRadius: "20px",
                  borderBottomLeftRadius: "20px"
                }}
              >

                <div >
                  <img src={shardasmall} style={{margin:"10px"}} height="40px"/>
                  <img src={A7ABIG} style={{margin:"10px"}} height="40px"/>
                </div>
                <div className="row">
                 
                <div className="col-12">
                <h3 style={{display:"inline"}} style={{ color: "white" }}>
                  TURING THINKING
                </h3>
                </div>
                </div>
               

                <p style={{color:"white"}} onClick={function a7a(){window.open("https://a7aweb.web.app", "_a7a")}}>Powered by  <b>A7A</b></p>
              </div>

              <div style={{ background: "#FFE0B2", borderRadius: "10px" }}>
                <p style={{ color: "black" }}>
                  {/* <b> Correct Answers : {this.state.correct}</b>
                  <br />
                  <b> Wrong Attempts : {this.state.wrong}</b> */}
                </p>
              </div>
            </div>

            <div className="col-6">
            <h3>TIME LEFT</h3>
            <div id="clockdiv">
  {/* <div>
    <span class="days"></span>
    <div class="smalltext">Days</div>
  </div>
  <div>
    <span class="hours"></span>
    <div class="smalltext">Hours</div>
  </div> */}
  <div>
    <span class="minutes">{this.state.time.m}</span>
    <div class="smalltext">Minutes</div>
  </div>
  <div>
    <span class="seconds">{this.state.time.s}</span>
    <div class="smalltext">Seconds</div>
  </div>
</div>



            </div>

            <div id="signbutton" className="col-2">
              <div
                style={{
                  borderRadius: "20px",
                  backgroundColor: "white",
                  margin: "10px",
                  padding: "2px"
                }}
                onClick={this.signin.bind(this)}
              >
                <img
                  style={{ display: "inline" }}
                  height="40px"
                  width="40px"
                  src="https://www.thelogocreative.co.uk/wp-content/uploads/2017/10/google-logo-9.png"
                ></img>
                &nbsp;&nbsp;<b>Login with google</b>
              </div>
            </div>

            <div
              id="profiletag"
              className="col-3"
              style={{ visibility: "hidden" }}
            >
              <div
                style={{
                  borderRadius: "20px",
                  backgroundColor: "white",
                  margin: "10px",
                  padding: "2px"
                }}
                onClick={this.signin.bind(this)}
              >
                <img
                  id="dp"
                  height="40px"
                  width="40px"
                  style={{ display: "inline", borderRadius: "50px" }}
                ></img>
                &nbsp;&nbsp; <b id="username"></b>
                <br/>
               
              </div>
            </div>
          </div>
          <button id="upperLogoutButton" onClick={this.logout.bind(this)} className="btn btn-warning">Logout</button>
        </div>

        <Helmet>
          <style>{"body { background-color: #F06292; }"}</style>
        </Helmet>
        <div style={{ height: "40px" }}></div>
        

        <div className="container" id="afterProgramming" style={{display:"none"}}>
        <h1 className="text-center">PROGRAMMING SCORE</h1>

          <div className="row">
        

            <div className="col-3" style={{
                          boxShadow:
                            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                          margin: "20px",
                          padding: "30px",
                          borderRadius: "20px",
                          backgroundColor: "white"
                        }} >
            <h1>Total Score</h1>
            <h2>{SC_PROGRAMMING}</h2>
              </div>

              <div className="col-4" style={{
                          boxShadow:
                            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                          margin: "20px",
                          padding: "30px",
                          borderRadius: "20px",
                          backgroundColor: "white"
                        }} >
            <h1 style={{color:"green"}}>Correct Answers</h1>
            <h2>{C_PROGRAMMING}</h2>
              </div>

              <div className="col-3" style={{
                          boxShadow:
                            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                          margin: "20px",
                          padding: "30px",
                          borderRadius: "20px",
                          backgroundColor: "white"
                        }} >
            <h1  style={{color:"red"}}>Wrong Answers</h1>
            <h2>{W_PROGRAMMING}</h2>
              </div>

                        

          
          </div>
          <button onClick={this.logoutWithoutSaving.bind(this)} className="btn btn-warning">Logout</button>

          
             
        </div>

        <div id="programming">       
        {this.state.questions
          .slice(this.state.currentIndex, this.state.currentIndex + 1)
          .map(q => {
            return (
              <div
                id="div2"
                className="container-fluid"
                style={{ backgroundColor: "#F06292", height: "100%" }}
              >
                <div className="row" >
                  <div className="col-2"></div>
                  <div className="col-8">
                    <h1 style={{ color: "white" }}>
                      {" "}
                     PROGRAMMING -  QUESTION {this.state.currentIndex + 1} OF {40}
                    </h1>
                  </div>

                  <div className="col-2">
                    {/* <h1 style={{ color: "white" }}> LEADERBOARD </h1> */}
                  </div>
                </div>

                <div className="row">
                  <div className="col-2"></div>
                  <div className="col-8">
                    <div
                      style={{
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        margin: "20px",
                        padding: "30px",
                        borderRadius: "20px",
                        backgroundColor: "white"
                      }}
                    >
                      <div className="card-body">
                        <div className="row">
                        <div
                              onClick={()=>this.previousQuestion(q.id)}
                              className="col-5"
                              style={{
                                borderRadius: "20px",
                                backgroundColor: "#D84315",
                                
                              }}
                            >
                              <h4 style={{ color: "white", marginTop: "6px" }}>
                                Previous
                              </h4>
                            </div>

                              <div className="col-2"></div>
                            <div
                              id="nextProgrammingButton"
                              onClick={()=>this.nextQuestion(q.id)}
                              className="col-5"
                              style={{
                                borderRadius: "20px",
                                backgroundColor: "#D84315",
                              }}
                            >
                              <h4 style={{ color: "white", marginTop: "6px" }}>
                                Next 
                              </h4>
                            </div>
                              
                        </div>
                        <h1 className="text-justify" dangerouslySetInnerHTML={{ __html: q.q }} />
                        <div onChange={this.setAnswer.bind(this)}>
                          <div
                            className="row"
                            style={{
                              backgroundColor: "#F5F5F5",
                              borderRadius: "20px",
                              paddingBottom: "14px",
                              margin: "5px"
                            }}
                          >
                            <div className="col-1">
                              <input
                                type="radio"
                                id="o1"
                                value={q.op1}
                                className="form-radio"
                                name="gender"
                              />
                            </div>
                            <div
                              className="col-9"
                              style={{
                                marginTop: "10px",
                                justifyContent: "start"
                              }}
                            >
                              {q.op1}
                            </div>
                          </div>

                          <div
                            className="row"
                            style={{
                              backgroundColor: "#F5F5F5",
                              borderRadius: "20px",
                              paddingBottom: "14px",
                              margin: "5px"
                            }}
                          >
                            <div className="col-1">
                              <input
                                type="radio"
                                id="o2"
                                value={q.op2}
                                className="form-radio"
                                name="gender"
                              />
                            </div>
                            <div
                              className="col-9"
                              style={{
                                marginTop: "10px",
                                justifyContent: "start"
                              }}
                            >
                              {q.op2}
                            </div>
                          </div>

                          <div
                            className="row"
                            style={{
                              backgroundColor: "#F5F5F5",
                              borderRadius: "20px",
                              paddingBottom: "14px",
                              margin: "5px"
                            }}
                          >
                            <div className="col-1">
                              <input
                                type="radio"
                                id="o3"
                                value={q.op3}
                                className="form-radio"
                                name="gender"
                              />
                            </div>
                            <div
                              className="col-9"
                              style={{ marginTop: "10px" }}
                            >
                              {q.op3}
                            </div>
                          </div>

                          <div
                            className="row"
                            style={{
                              backgroundColor: "#F5F5F5",
                              borderRadius: "20px",
                              paddingBottom: "14px",
                              margin: "5px"
                            }}
                          >
                            <div className="col-1">
                              <input
                                type="radio"
                                id="o4"
                                value={q.op4}
                                className="form-radio"
                                name="gender"
                              />
                            </div>
                            <div
                              className="col-9"
                              style={{ marginTop: "10px" }}
                            >
                              {q.op4}
                            </div>
                          </div>

                          <div
                            id="btn"
                            className="row"
                            style={{ marginTop: "40px" }}
                          >

                          
                            <div
                            id="subAndNextProgrammingButton"
                              onClick={()=>this.submitAnswer(q.id)}
                              className="col-5"
                              style={{
                                borderRadius: "20px",
                                backgroundColor: "#26A69A",
                              }}
                            >
                              <h4 style={{ color: "white", marginTop: "6px" }}>
                                Save
                              </h4>
                            </div>

                            <div className="col-2"></div>

                            <div
                              onClick={()=>this.submitProgrammingQuiz()}
                              className="col-5"
                              style={{
                                borderRadius: "20px",
                                backgroundColor: "#26A69A",
                              }}
                            >
                              <h4 style={{ color: "white", marginTop: "6px" }}>
                                Submit quiz
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-2">
                    {/* <div
                      style={{
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        margin: "20px",
                        padding: "30px",
                        borderRadius: "20px",
                        background: "#FFE0B2"
                      }}
                    >
                      {this.state.leaderboard
                        .sort(function(a, b) {
                          console.log(a.points, b.points);
                          return b.points - a.points;
                        })
                        .map(q => {
                          return (
                            <div style={{ margin: "10px" }}>
                              <div className="row">
                                <div className="col-3">
                                  <img
                                    style={{ borderRadius: "50%" }}
                                    src={q.dp}
                                    height="30px"
                                    width="30px"
                                  />
                                </div>

                                <div className="col-6">{q.name}</div>

                                <div className="col-3">{q.points}</div>
                              </div>
                            </div>
                          );
                        })}
                    </div> */}
                  </div>
                </div>
              </div>
            );
          })}

</div>


<div className="container" id="afterAptitude" style={{display:"none"}}>
  <br/><br/>
<h1 className="text-center">APTITUDE SCORE</h1>

          <div className="row">

            <div className="col-3" style={{
                          boxShadow:
                            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                          margin: "20px",
                          padding: "30px",
                          borderRadius: "20px",
                          backgroundColor: "white"
                        }} >
            <h1>Total Score</h1>
            <h2>{SC_APTITUDE}</h2>
              </div>

              <div className="col-4" style={{
                          boxShadow:
                            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                          margin: "20px",
                          padding: "30px",
                          borderRadius: "20px",
                          backgroundColor: "white"
                        }} >
            <h1 style={{color:"green"}}>Correct Answers</h1>
            <h2>{C_APTITUDE}</h2>
              </div>

              <div className="col-3" style={{
                          boxShadow:
                            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                          margin: "20px",
                          padding: "30px",
                          borderRadius: "20px",
                          backgroundColor: "white"
                        }} >
            <h1  style={{color:"red"}}>Wrong Answers</h1>
            <h2>{W_APTITUDE}</h2>
              </div>

 

  
          </div>


          
          <button onClick={this.logoutWithoutSaving.bind(this)} className="btn btn-warning">Logout</button>

          <br/>
          <br/>

             
        </div>

 <div id="aptitude" >       
        {this.state.Aptquestions
          .slice(this.state.currentIndexApt, this.state.currentIndexApt + 1)
          .map(q => {
            return (
              <div
                id="div2"
                className="container-fluid"
                style={{ backgroundColor: "#F06292", height: "100%" }}
              >
                <div className="row">
                <div className="col-2"></div>

                  <div className="col-8">
                    <h1 style={{ color: "white" }}>
                      {" "}
                      APTITUDE - QUESTION {this.state.currentIndexApt + 1} OF {10}
                    </h1>
                  </div>

                  <div className="col-2"></div>

                  
                </div>

                <div className="row">
                  <div className="col-2"></div>
                  <div className="col-8">
                    <div
                      style={{
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        margin: "20px",
                        padding: "30px",
                        borderRadius: "20px",
                        backgroundColor: "white"
                      }}
                    >
                      <div className="card-body">

                        <div className="row">
                        <div
                              onClick={()=>this.previousQuestionApt(q.id)}
                              className="col-5"
                              style={{
                                borderRadius: "20px",
                                backgroundColor: "#D84315",
                              }}
                            >
                              <h4 style={{ color: "white", marginTop: "6px" }}>
                                Previous
                              </h4>
                            </div>

                            <div className="col-2"></div>

                            <div
                              id = "nextAptitudeButton"
                              onClick={()=>this.nextQuestionApt(q.id)}
                              className="col-5"
                              style={{
                                borderRadius: "20px",
                                backgroundColor: "#D84315",
                              }}
                            >
                              <h4 style={{ color: "white", marginTop: "6px" }}>
                                Next 
                              </h4>
                            </div>
                        </div>
                        <h1 dangerouslySetInnerHTML={{ __html: q.q }} />
                        <div onChange={this.setAnswerAptitude.bind(this)}>
                          <div
                            className="row"
                            style={{
                              backgroundColor: "#F5F5F5",
                              borderRadius: "20px",
                              paddingBottom: "14px",
                              margin: "5px"
                            }}
                          >
                            <div className="col-1">
                              <input
                                type="radio"
                                id="oa1"
                                value={q.op1}
                                className="form-radio"
                                name="gender"
                              />
                            </div>
                            <div
                              className="col-9"
                              style={{
                                marginTop: "10px",
                                justifyContent: "start"
                              }}
                            >
                              {q.op1}
                            </div>
                          </div>

                          <div
                            className="row"
                            style={{
                              backgroundColor: "#F5F5F5",
                              borderRadius: "20px",
                              paddingBottom: "14px",
                              margin: "5px"
                            }}
                          >
                            <div className="col-1">
                              <input
                                type="radio"
                                id="oa2"
                                value={q.op2}
                                className="form-radio"
                                name="gender"
                              />
                            </div>
                            <div
                              className="col-9"
                              style={{
                                marginTop: "10px",
                                justifyContent: "start"
                              }}
                            >
                              {q.op2}
                            </div>
                          </div>

                          <div
                            className="row"
                            style={{
                              backgroundColor: "#F5F5F5",
                              borderRadius: "20px",
                              paddingBottom: "14px",
                              margin: "5px"
                            }}
                          >
                            <div className="col-1">
                              <input
                                type="radio"
                                id="oa3"
                                value={q.op3}
                                className="form-radio"
                                name="gender"
                              />
                            </div>
                            <div
                              className="col-9"
                              style={{ marginTop: "10px" }}
                            >
                              {q.op3}
                            </div>
                          </div>

                          <div
                            className="row"
                            style={{
                              backgroundColor: "#F5F5F5",
                              borderRadius: "20px",
                              paddingBottom: "14px",
                              margin: "5px"
                            }}
                          >
                            <div className="col-1">
                              <input
                                type="radio"
                                id="oa4"
                                value={q.op4}
                                className="form-radio"
                                name="gender"
                              />
                            </div>
                            <div
                              className="col-9"
                              style={{ marginTop: "10px" }}
                            >
                              {q.op4}
                            </div>
                          </div>

                          <div
                            id="btn"
                            className="row"
                            style={{ marginTop: "40px" }}
                          >
                           

                            <div
                            id="subAndNextAptitudeButton"
                              onClick={()=>this.submitAnswerApt(q.id)}
                              className="col-5"
                              style={{
                                borderRadius: "20px",
                                backgroundColor: "#26A69A",
                              }}
                            >
                              <h4 style={{ color: "white", marginTop: "6px" }}>
                                Save
                              </h4>
                            </div>
                            <div className="col-2"></div>
                            <div
                              onClick={()=>this.submitAptitude()}
                              className="col-5"
                              style={{
                                borderRadius: "20px",
                                backgroundColor: "#26A69A",
                              }}
                            >
                              <h4 style={{ color: "white", marginTop: "6px" }}>
                                Submit Quiz
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-2">
                   
                  </div>
                </div>
              </div>
            );
          })}

</div>  

      </div>
    )
    
     :
    
    
    
    (
      <div className="container-fluid" style={{ padding: "80px" }}>
        <div className="row">
          <div  className="col-6">
            <img src={sharda} width="90%" style={{marginBottom:"30px"}}/>
            {/* <div style={{display:"inline", marginLeft:"50px", marginTop:"80px"}}>
              <img style={{display:"inline"}}src={turing} height="80px"/>
              <h3 style={{display:"inline", marginLeft:"40px"}}>TURING THINKING</h3>
            </div> */}

            {/* <div style={{display:"inline", marginLeft:"50px", marginTop:"30px"}}>
              <img style={{display:"inline"}}src={mindfizz} height="100px"/>
              <h3 style={{display:"inline", marginLeft:"40px"}}>TURING THINKING</h3>
            </div> */}
            <br/><br/>
            <div  style={{
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        margin: "2px",
                        padding: "30px",
                        borderRadius: "20px",
                        backgroundColor: "white"
                      }}>
            <h1>INSTRUCTIONS</h1>
            <br/><br/>
            <h5>
            

            </h5>
            </div>
          </div>

          <div className="col-0"></div>

          <div className="col-6">

            <div className="row">
            

              <div className="col-4">
              <img src={logo} className="text-center" height="200" width="200"></img>
              <br/>
              </div>

              <div className="col-8">
                   <h4><i>AND WHEN ALL IS LOST. WE WILL BE FOUND.</i></h4> 

                   {/* <p>We design and develop websites, web shops, mobile apps, digital campaigns, system integrations and customized software of the highest level. Designs that are meticulously thought out to the pixel and are of this time. Today's software, ready for tomorrow's technology. </p> */}
                   <div style={{display:"inline"}}>
                        <div onClick={function(){window.open("https://www.facebook.com/a7aent/")}} style={{display:"inline"}}><img height="30px" style={{margin:"4px"}} src={facebook}></img></div>
                        <div onClick={function(){window.open("https://discord.gg/kJMvucS")}} style={{display:"inline"}}><img height="30px" style={{margin:"4px"}} src={discord}></img></div>
                        <div onClick={{function(){window.open("https://www.reddit.com/user/a7aent/")}}} style={{display:"inline"}}><img height="30px" style={{margin:"4px"}} src={reddit}></img></div>
                        <div onClick={function(){window.open("https://www.youtube.com/channel/UCj8I5iRbK98-VFIHzA5aduQ")}} style={{display:"inline"}}><img height="30px" style={{margin:"4px"}} src={youtube}></img></div>
                        <div onClick={function(){window.open("https://www.instagram.com/a7aent/")}} style={{display:"inline"}}><img height="30px" style={{margin:"4px"}} src={instagram}></img></div>
                        <div onClick={function(){window.open("https://a7aweb.web.app")}} style={{display:"inline"}}><img height="30px" style={{margin:"4px"}} src={domain}></img></div>
                    </div>
            
              </div>
            </div>
            <p className="text-center"><a href="https://a7aweb.web.app">POWERED BY A7A</a></p> 

            <br/>

            <div  style={{
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        margin: "20px",
                        padding: "30px",
                        borderRadius: "20px",
                        backgroundColor: "white"
                      }}>
          <label for="fname">First Name</label>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Your name.."
          ></input>

          <label for="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            name="lastname"
            placeholder="Your last name.."
          ></input>

          <label for="sysid">System ID</label>
          <input
            type="text"
            id="sysid"
            name="systemud"
            placeholder="Your system id.."
          ></input>

          <label for="lang">Programming Language</label>
          <select id="lang" name="lang">
            <option value="C">C</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
          </select>


          <button class="btn btn-success"style={{marginTop:"20px"}} type="submit" value="Submit" onClick={this.updateDetails.bind(this)}>{this.state.signedIn}</button>
        </div>
        </div>
        </div>

      </div>
    );
  }
}

export default App;
