import React from 'react'
import wheel from './foto/pok.png'
import wheel2 from './foto/pok2.png'
import './esa/singupic.scss'
import { useEffect } from 'react'

const Singupic = () => {
    useEffect(()=>{
        const first_name = document.getElementById("first_name");
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const go = document.getElementById("go");
        const url = "http://127.0.0.1:5000/user"
        const urllog = "http://127.0.0.1:5000/login"
        const alert_email = document.getElementById("alert_email");
        document.body.style.overflow = "hidden";

        first_name.addEventListener("click", (event2) => {
            first_name.style.borderColor = "transparent";
            first_name.style.backgroundColor = "rgba(255, 255, 255, 0.07)";
        })

        email.addEventListener("click", (event2) => {
            email.style.borderColor = "transparent";
            email.style.backgroundColor = "rgba(255, 255, 255, 0.07)";
            alert_email.innerHTML = `Email `
        })

        password.addEventListener("click", (event2) => {
            password.style.borderColor = "transparent";
            password.style.backgroundColor = "rgba(255, 255, 255, 0.07)";
        })

        go.addEventListener("click", (event1) => {
            if(password.value != ""){
                
                firstrequest("POST", url)
                .then(data => {
                    if (data["code"] == 200){
                        loginrequest("POST", urllog, password.value, email.value).then(data => {
                            if (data["code"] == 200){
                                sessionStorage.setItem("bearer",data["token"]);
                                sessionStorage.setItem('user', JSON.stringify(data["user"]));
                                window.location.href = `/profile/${data["user"]["id_user"]}`;
                            }})
                        }
                    else if(data["code"] == 400){
                        if (data["massage"] = "Email not unique"){
                            email.style.borderColor = "red";
                            email.style.backgroundColor = "#ed7f6c59";
                            alert_email.innerHTML = `Email <text style="color: red; font-weight: 900;">(not unique)</text>`
                        }
                        
                    }
                    if(first_name.value == ""){
                        first_name.style.borderColor = "red";
                        first_name.style.backgroundColor = "#ed7f6c59";
                    }
                    if(email.value == ""){
                        email.style.borderColor = "red";
                        email.style.backgroundColor = "#ed7f6c59";
                    }

                })
            }
            else{
                password.style.borderColor = "red";
                password.style.backgroundColor = "#ed7f6c59";
                if(first_name.value == ""){
                    first_name.style.borderColor = "red";
                    first_name.style.backgroundColor = "#ed7f6c59";
                }
                if(email.value == ""){
                    email.style.borderColor = "red";
                    email.style.backgroundColor = "#ed7f6c59";
                }
            }
            }
        )


function firstrequest(metod, url){
    const headers = {
        'Content-Type': 'application/json'
    }
    return fetch(url, {
        method: metod,
        headers: headers, 
        
        body: JSON.stringify({
            "first_name" : first_name.value,
            "email" : email.value,
            "role" : "customer",
            "password" : password.value,
            "image" :"driver.png"
        })
    }).then(response => {
        return response.json()
    })
}

function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
    }

function loginrequest(metod, url,password,email){
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
    },[])
    return (
    <>
        <div className="allbody">
        <div className="background">
            <div className="shape"><img src={wheel} /></div>
            <div className="shape"><img src={wheel2} /></div>
        </div>
        <div className="form">
            <h3>Sign up Here</h3>

            <label htmlFor="first_name">Username</label>
            <input type="text" placeholder="Name" id="first_name"/>
    
            <label htmlFor="email" id = "alert_email">Email</label>
            <input type="text" placeholder="Email or Phone" id="email"/>
    
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" id="password"/>
    
            <button id="go">Sign Up</button>
        </div>
    </div>
    </>
  )
}

export default Singupic