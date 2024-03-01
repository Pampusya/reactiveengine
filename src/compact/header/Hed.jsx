import React from 'react'
import moto from './foto/motor.png'
import  {Outlet, useLocation} from 'react-router-dom'
import './esa/hederic.scss'
import { useEffect } from 'react'

const Hed = () => {
  const location = useLocation();
  useEffect(()=>{
    const first_part = location.pathname.split('/')[1]
    const but = document.getElementById("buttonsinup");
    if (sessionStorage.getItem("user"))
    {
      const idmy = JSON.parse(sessionStorage.getItem("user"))["id_user"]
      but.innerHTML = `<button class ="buttonsignin" style = "width: 110px;margin:auto;margin-bottom: 20px"><a href="/profile/${idmy}">Profile</a></button>
      <button class ="buttonsignin" style = "opacity:0; cursor:default" ></button>
      <button class ="buttonsignup" style = "opacity:0; cursor:default" ></button>`
      if (first_part ==="profile"){
        but.innerHTML =`<button class ="buttonsignin" style = "opacity:0; cursor:default" ></button>
      <button class ="buttonsignup" style = "opacity:0; cursor:default" ></button>`
      }
    }
  },[])
  return (
    <><header>
      <div className="left_header">
        <img src={moto} alt="Motor" className="motor"/>
        <div className="sites">
          <ul>
            <a href="/">Home</a>
            <a href="/catalog">Catalog</a>   
          </ul>
        </div>
      </div> 
      <div className ="buttons" id = "buttonsinup">
        <button className ="buttonsignin"><a href="/in">sign in</a></button>
        <button className ="buttonsignup"><a href="/up">sign up</a></button>
      </div>     
    </header>
    <Outlet/>
    </>
  )
}


export default Hed