import React from 'react'
import './esa/homic.scss'
import maincar from './foto/car.png'
import { useEffect } from 'react'

const Homic = () => {
  useEffect(()=>{
    document.body.style.overflow = "hidden";
  },[])
  return (
    <>
    <div className ="logos">
        <div className = "logo">
          Speed in<br/>blood&nbsp;
        </div>
        <div className = "logoshadow">
          Speed in<br/>blood&nbsp;
        </div> 
        <div className="placebutton">
          <div className="place"></div>
          <button className="rentbutton"><a href="/catalog">RENT NOW</a></button>
      </div>       
    </div>
    <img src={maincar} alt="car" className="car"></img>
    </>
    )
}

export default Homic