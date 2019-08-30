import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as firebase from 'firebase';
import {withGetScreen} from 'react-getscreen'
import next from './images/next.png';
import back from './images/back.png';
import {Helmet} from 'react-helmet';



let length = 0;
let temp = [];
let selected;

export class App extends Component {


  constructor(props){
    super(props);
    this.state={

      currentScore : 0,
      correct:0,
      wrong:0,
      questions : [],
      currentIndex : 0,
     
     
    }
  }
 
  componentDidMount(){
  
    const rootRef = firebase.database().ref();
    const speedRef = rootRef.child('quiz1');
   
    speedRef.on('value', snap=>{
      let questions  = snap.val();
      let newState = [];
      for(let x in questions){
        newState.push({
          id : x,
          op1 : questions[x].op1,
          op2 : questions[x].op2,
          op3 : questions[x].op3,
          op4 : questions[x].op4,
          q: questions[x].question,
          answer : questions[x].answer
        })
        length = length + 1;
        console.log(length)
      }

      length = newState.length;
     
     this.setState({
       questions : newState,
       
     }) 
     
    });

   

  }

  setAnswer(event) {
    selected = event.target.value;
    console.log(selected)
  }


  submitAnswer(){
    console.log(selected);
    let that  = this;
    let a = selected;
    console.log(this.state.currentIndex)
    let q = this.state.currentIndex;
    firebase.database().ref('/quiz1/' + 'q' + (q+1)).once('value').then(function(snap){
      console.log(snap.val().answer);
      if(a===snap.val().answer){
        let cc = that.state.currentScore + 1;
        let cr = that.state.correct + 1;
        that.setState({
          currentScore : cc,
          correct : cr
        });        
      }

      else {
        document.getElementById('div1').style.backgroundColor="#b71c1c";
        document.getElementById('div2').style.backgroundColor="#b71c1c";
        let cr = that.state.wrong + 1;
        that.setState({
          wrong : cr
        });  
      }
    });
  }

  nextQuestion(){
     console.log("ho");
     let c = this.state.currentIndex + 1
     if(c < length){
      let that = this;
      that.setState({
        currentIndex : c
      });
      document.getElementById('o1').checked = false;
      document.getElementById('o2').checked = false;
      document.getElementById('o3').checked = false;
      document.getElementById('o4').checked = false;
     }
   
    console.log(this.state.currentIndex);
  }

  previousQuestion(){
    console.log("ho");
    let c = this.state.currentIndex - 1
    if(c>=0){
      let that = this;
      that.setState({
        currentIndex : c
      });

      document.getElementById('o1').checked = false;
      document.getElementById('o2').checked = false;
      document.getElementById('o3').checked = false;
      document.getElementById('o4').checked = false;
    }
   
   console.log(this.state.currentIndex);
 }

  render() {
    
    return (
      <div id="div1" className="App" style={{backgroundColor:"#F06292", height:"100%"}}>
        <div className="container-fluid">
        <div className="row">
          <div className="col-8">
          <div style={{background:"#000", borderBottomRightRadius:"20px", borderBottomLeftRadius:"20px"}}> 
          <p style={{color:"white"}}>
            Current Score : {this.state.currentScore}
          </p>
        </div>

        <div id="div2" style={{background:"#FFE0B2", borderRadius:"10px"}}> 
          <p style={{color:"black"}}>
           <b> Correct Answers : {this.state.correct}</b><br/>
           <b> Wrong Answers : {this.state.wrong}</b>
          </p>
        </div>

          </div>

        <div className="col-4">
        <div className="row">
            <div className="col-6">

            <div onClick={
            this.previousQuestion.bind(this)} style={{borderRadius:"50%", backgroundColor:"#F5F5F5", height:"50px", width:"50px", marginTop:"10px"}}>
                  <img src={back} height="10px"  width="10px" style={{marginTop:"20px"}}/>
                  </div>


        
            </div>

            <div className="col-6">
                    
            <div onClick={
            this.nextQuestion.bind(this)} className="float-right" style={{borderRadius:"50%", backgroundColor:"#F5F5F5", height:"50px", width:"50px", marginTop:"10px"}}>
                  <img src={next} height="10px"  width="10px" style={{marginTop:"20px"}}/>
                  </div>
            </div>
        </div>
        

        </div>

        </div>
        </div>
       
         <Helmet>
                <style>{'body { background-color: #F06292; }'}</style>
            </Helmet>
       
        {this.state.questions.slice(this.state.currentIndex,this.state.currentIndex+1).map(q=>{
          return(
            <div className="container-fluid" style={{backgroundColor:"#F06292", height:"100%"}}>
            <div className="row">
             

              <div className="col-12">
              <div style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", margin:"20px", padding:"30px", borderRadius:"20px", backgroundColor:"white"}}>
                <div>
                  <h1 className="card-title">{q.q}</h1>
                  <div onChange={this.setAnswer.bind(this)}>
                      <div className="row" style={{backgroundColor:"#F5F5F5", borderRadius:"20px", paddingBottom:"14px", margin:"5px"}}>
                        <div className="col-1" >
                        <input type="radio" id="o1" value={q.op1} className="form-radio" name="gender"/>
                        </div>
                        <div className="col-9" style={{marginTop:"10px", justifyContent : "start"}}>
                        {q.op1}
                        </div>
                      </div>
                      
                      <div className="row"  style={{backgroundColor:"#F5F5F5", borderRadius:"20px", paddingBottom:"14px", margin:"5px"}}>
                        <div className="col-1">
                        <input type="radio" id="o2" value={q.op2} className="form-radio" name="gender"/>
                        </div>
                        <div className="col-9" style={{marginTop:"10px", justifyContent : "start"}}>
                        {q.op2}
                        </div>
                      </div>


                      <div className="row"  style={{backgroundColor:"#F5F5F5", borderRadius:"20px", paddingBottom:"14px", margin:"5px"}}>
                        <div className="col-1">
                        <input type="radio" id="o3" value={q.op3} className="form-radio" name="gender"/>
                        </div>
                        <div className="col-9" style={{marginTop:"10px"}}>
                        {q.op3}
                        </div>
                      </div>

                      <div className="row"  style={{backgroundColor:"#F5F5F5", borderRadius:"20px", paddingBottom:"14px", margin:"5px"}}>
                        <div className="col-1">
                        <input type="radio" id="o4" value={q.op4} className="form-radio" name="gender"/>
                        </div>
                        <div className="col-9" style={{marginTop:"10px"}}>
                        {q.op4}
                        </div>
                      </div>


                      <div className="row" style={{marginTop:"40px"}}>
                        <div  onClick={this.submitAnswer.bind(this)} className="col-12" style={{borderRadius:"20px", backgroundColor:"#26A69A", margin:"1px"}}>
                          <h4 style={{color:"white", marginTop:"6px"}}>Submit</h4>
                        </div>

                       
                      </div>
                  
                   
                  </div>  
                </div>
                
              
            </div>
            <h1 style={{color:"white"}}> Question {this.state.currentIndex + 1} of {length}</h1>
              </div>

           
         

             



            </div>
            </div>
          );
        })}
      </div>
    )
  }
}

export default App
