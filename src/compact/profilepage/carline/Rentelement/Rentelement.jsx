import React from 'react'
import axios from 'axios';
import {useState,useEffect} from 'react'

const Rentelement = ({car}) => {
  const [mark,setMark] = useState("")
  const [model,setModel] = useState("")
  const [end,setEnd] = useState("")
  const [time,setTime] = useState("")
  
  useEffect(()=>{ 
    const getcar = async()=> {
      const info = (await axios.get(`http://127.0.0.1:5000/car/${car['car_id']}`))["data"]
      setMark(info["mark"])
      setModel(info["model"])
      
      const year = new Date(car["end_of_lease"]);
      const yearFormat = year.getDate()+"-"+year.getMonth()+"-"+ year.getFullYear();
      setTime(yearFormat)
    }
    getcar()
    console.log(car["end_of_lease"])
    
  },[])

  return (
    <div className="alreadycar">
        <div className="rentcarimage"><img src = {require(`../../../catalog/fotos/${car['car_id']}.png`)} alt="imagecars" className="img"/></div>
        <div className="textrent"><b>{mark}</b><br/>{model}</div>
        <div className="textrentprice"><b>End:{time}</b></div>
    </div>
  )
}

export default Rentelement