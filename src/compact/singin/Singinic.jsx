import React from 'react'
import './esa/singinic.scss'
import wheel from './foto/tire.png'
import wheel2 from './foto/tire2.png'
import { useEffect } from 'react'

const Singinic = () => {
  useEffect(()=>{
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const go_button = document.getElementById("go");
  const url = "http://127.0.0.1:5000/login"
  const alert1 = document.getElementById("alert");
  const alert2 = document.getElementById("form1")
  const forgot = document.getElementById("forgot")
  document.body.style.overflow = "hidden";
  
  forgot.addEventListener("click", (event3) => {
    window.alert("Please write to this email: admin@gmail.com");
  })

  email.addEventListener("click", (event2) => {
      email.style.borderColor = "transparent";
      email.style.backgroundColor = "rgba(255, 255, 255, 0.07)";
      password.style.borderColor = "transparent";
      password.style.backgroundColor = "rgba(255, 255, 255, 0.07)";
      alert1.innerHTML = `Username`
      alert2.style.height = "450px";
  })
  
  password.addEventListener("click", (event2) => {
      email.style.borderColor = "transparent";
      email.style.backgroundColor = "rgba(255, 255, 255, 0.07)";
      password.style.borderColor = "transparent";
      password.style.backgroundColor = "rgba(255, 255, 255, 0.07)";
      alert1.innerHTML = `Username`
      alert2.style.height = "450px";
  })
  
  function utf8_to_b64(str) {
      return window.btoa(unescape(encodeURIComponent(str)));
      }
  
  function firstrequest(metod, url,password,email){
      const headers = {
          'Content-Type': 'application/json',
          'Authorization':`Basic ${utf8_to_b64(`${email}:${password}`)}`
      }
      return fetch(url, {
          method: metod,
          headers: headers 
          
          
      }).then(response => {
          return response.json()
      })
  }
  
  go_button.addEventListener("click",(e) => {
      if(email.value == ""){
          email.style.borderColor = "red";
          email.style.backgroundColor = "#ed7f6c59";
      }
      if(password.value != ""){
          firstrequest("POST",url,password.value,email.value).then(data => {
              if (data["code"] == 200){
                  sessionStorage.setItem("bearer",data["token"]);
                  sessionStorage.setItem('user', JSON.stringify(data["user"]));
                  window.location.href = `/profile/${data["user"]["id_user"]}`;
              }
              else{
                  email.style.borderColor = "red";
                  password.style.borderColor = "red";
                  alert2.style.height = "490px";
                  alert1.innerHTML = `<text style="color: red; font-weight: 900;">Username or password is incorect</text><br>Username `
              }
          })
      }
      else{
          password.style.borderColor = "red";
          password.style.backgroundColor = "#ed7f6c59";
      }
  
      
  })
  },[])
  return (
    <>
    <div className="allbody1">
        <div className="background">
            <div className="shape"><img src={wheel2} /></div>
            <div className="shape"><img src={wheel} /></div>
        </div>
        <div className="form1" id = "form1">
            <h3 className="textup">Sign in Here</h3>
    
            <label htmlFor="email" id = "alert">Username</label>
            <input type="text" placeholder="Email or username" id="email"/>
    
            <label htmlFor="password">Password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id = "forgot">forgot?</a></label>
            <input type="password" placeholder="Password" id="password"/>
    
            <button id = "go">Sign In</button>
        </div>
    </div>
    </>
  )
}

export default Singinic