import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as firebase from "firebase";
import { withGetScreen } from "react-getscreen";
import next from "./images/next.png";
import back from "./images/back.png";
import { Helmet } from "react-helmet";

let length = 0;
let usersLength = 0;
let temp = [];
let selected;
let clickedOnce = false;
let UID;


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScore: 0,
      correct: 0,
      wrong: 0,
      questions: [],
      leaderboard: [],
      currentIndex: 0
    };

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
        console.log(user);
        document.getElementById("signbutton").style.display = "none";
        document.getElementById("profiletag").style.visibility = "visible";
        document.getElementById("username").innerHTML = displayName;
        document.getElementById("dp").src = user.photoURL;

        // ...
      } else {
        // User is signed out.
        // ...
        document.getElementById("signbutton").style.visibility = "visible";
        document.getElementById("profiletag").style.display = "none";
      }
    });
  }

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
        console.log(user);

        // ...
      } else {
        // User is signed out.
        // ...
      }
    });
  }

  componentDidMount() {
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

        console.log(user);

        // ...
      } else {
        // User is signed out.
        // ...
      }
    });
    const rootRef = firebase.database().ref();
    const speedRef = rootRef.child("quiz1");
  
    speedRef.on("value", snap => {
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
        console.log(length);
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
        console.log(leaderboards[x].points);
        newStateLeaderboard.push({
          name: leaderboards[x].name,
          dp: leaderboards[x].dp,
          id: x,
          points: leaderboards[x].points
        });
        usersLength = usersLength + 1;
        console.log(usersLength);
      }

      usersLength = newStateLeaderboard.usersLength;

      this.setState({
        leaderboard: newStateLeaderboard
      });

      console.log(this.state.leaderboard);
    });
  }

  setAnswer(event) {
    selected = event.target.value;
    console.log(selected);
  }



  submitAnswer() {
    document.getElementById("btn").style.visibility = "hidden";
    clickedOnce = true;
    console.log(selected);
    let that = this;
    let a = selected;
    console.log(this.state.currentIndex);
    let q = this.state.currentIndex;
    firebase
      .database()
      .ref("/quiz1/" + "q" + (q + 1))
      .once("value")
      .then(function(snap) {
        console.log(snap.val().answer);
        if (a === snap.val().answer) {
          let cc = that.state.currentScore + 3;
          let cr = that.state.correct + 1;

          that.setState({
            currentScore: cc,
            correct: cr
          });

          //NEXT QUESTION

          console.log(firebase.auth().currentUser.uid);
          var userRef = firebase
            .database()
            .ref()
            .child("leaderboard1")
            .child(firebase.auth().currentUser.uid)
            .child("points");

          userRef.transaction(function(points) {
            return points + 3;
          });

          console.log("ho");
          let c = that.state.currentIndex + 1;
          if (c < length) {
            document.getElementById("btn").style.visibility = "visible";

            that.setState({
              currentIndex: c
            });
            document.getElementById("o1").checked = false;
            document.getElementById("o2").checked = false;
            document.getElementById("o3").checked = false;
            document.getElementById("o4").checked = false;
          }
        } else {

          console.log(firebase.auth().currentUser.uid);
          var userRef = firebase
            .database()
            .ref()
            .child("leaderboard1")
            .child(firebase.auth().currentUser.uid)
            .child("points");

          userRef.transaction(function(points) {
            return points - 1;
          });

          document.getElementById("div1").style.backgroundColor = "#b71c1c";
          document.getElementById("div2").style.backgroundColor = "#b71c1c";

          setInterval(function() {
            document.getElementById("div1").style.backgroundColor = "#F06292";
            document.getElementById("div2").style.backgroundColor = "#F06292";
          }, 500);

          let cr = that.state.wrong + 1;
          let curScoreWrong = that.state.currentScore - 1;
          that.setState({
            wrong: cr,
            currentScore : curScoreWrong
          });

          //NEXT QUESTION

          console.log("ho");
          let c = that.state.currentIndex + 1;
          if (c < length) {
            document.getElementById("btn").style.visibility = "visible";

            that.setState({
              currentIndex: c
            });
            document.getElementById("o1").checked = false;
            document.getElementById("o2").checked = false;
            document.getElementById("o3").checked = false;
            document.getElementById("o4").checked = false;
          }
        }
      });
  }

  signin() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        // ...
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

  nextQuestion() {
    console.log("ho");
    let c = this.state.currentIndex + 1;
    if (c < length) {
      document.getElementById("btn").style.visibility = "visible";

      let that = this;
      that.setState({
        currentIndex: c
      });
      document.getElementById("o1").checked = false;
      document.getElementById("o2").checked = false;
      document.getElementById("o3").checked = false;
      document.getElementById("o4").checked = false;
    }

    console.log(this.state.currentIndex);
  }

  previousQuestion() {
    console.log("ho");
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

    console.log(this.state.currentIndex);
  }

  render() {
    return (
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
                <p style={{ color: "white" }}>
                  Current Score : {this.state.currentScore}
                </p>
              </div>

              <div style={{ background: "#FFE0B2", borderRadius: "10px" }}>
                <p style={{ color: "black" }}>
                  <b> Correct Answers : {this.state.correct}</b>
                  <br />
                  <b> Wrong Attempts : {this.state.wrong}</b>
                </p>
              </div>
            </div>

            <div className="col-6"></div>

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
              className="col-2"
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
              </div>
            </div>
          </div>
        </div>

        <Helmet>
          <style>{"body { background-color: #F06292; }"}</style>
        </Helmet>
        <div style={{ height: "40px" }}></div>
        {this.state.questions
          .slice(this.state.currentIndex, this.state.currentIndex + 1)
          .sort(() => Math.random() - 0.5).
          map(q => {
            return (
              <div
                id="div2"
                className="container-fluid"
                style={{ backgroundColor: "#F06292", height: "100%" }}
              >
                <div className="row">
                  <div className="col-9">
                    <h1 style={{ color: "white" }}>
                      {" "}
                      QUESTION {this.state.currentIndex + 1} OF {length}
                    </h1>
                  </div>

                  <div className="col-3">
                    <h1 style={{ color: "white" }}> LEADERBOARD </h1>
                  </div>
                </div>

                <div className="row">
                  <div className="col-9">
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
                        <h1 className="card-title">{q.q}</h1>
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
                              onClick={this.submitAnswer.bind(this)}
                              className="col-12"
                              style={{
                                borderRadius: "20px",
                                backgroundColor: "#26A69A",
                                margin: "1px"
                              }}
                            >
                              <h4 style={{ color: "white", marginTop: "6px" }}>
                                Submit and next
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-3">
                    <div
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
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default App;
