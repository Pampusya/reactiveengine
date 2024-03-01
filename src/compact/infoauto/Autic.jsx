import React,{useState,useEffect} from 'react'
import './esa/autic.scss'
import {useParams} from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Autic = () => {
    const {id} = useParams();
    const [mark,setMark] = useState("")
    const [fuel,setFuel] = useState("")
    const [model,setModel] = useState("")
    const [price,setPrice] = useState("")
    const [start,setStart] = useState(new Date().toISOString().split('T')[0])
    const [end,setEnd] = useState(new Date(new Date().getTime()+86400000).toISOString().split('T')[0])
    const [min,setMin] = useState(new Date())
    const [image,setImage] = useState("")
    const handlechange = (e) => {
        setStart(e.target.value)
        setEnd(new Date(new Date(e.target.value).getTime()+86400000).toISOString().split('T')[0])
    }
    const toregist = () =>{
        window.location.href = `http://localhost:3000/up`
    }
    const addrent = async() => {
        const user = JSON.parse(sessionStorage.user)
        const body = { 
            "start_of_lease": `${new Date(start).toISOString().slice(0, 19).replace('T', ' ')}`,
            "end_of_lease": `${new Date(end).toISOString().slice(0, 19).replace('T', ' ')}`
            
        }
        const about = (await axios.post(`http://127.0.0.1:5000/rent/${id}`, body, 
        {headers:{"Authorization": `Bearer ${sessionStorage.getItem("bearer")}`}}))["data"]
        if(about === 'Already taken on this date'){
            alert(about)
        }
        else{
            window.location.href = `http://localhost:3000/profile/${user["id_user"]}`
        }
    } 
    useEffect(()=>{ 
        const fetch_data = async() => {
            const data = ((await axios.get(`http://127.0.0.1:5000/car/${id}`))["data"])
            setMark(data["mark"])
            setFuel(data["fuel"])
            setModel(data["model"])
            setPrice(data["price_per_day"]) 
            setImage(data["image"])
        }
        fetch_data()
    },[])
    
    console.log(mark)
  return (
    <>
        <div className="allrent">
        <div className="desc">
            <div className="imgmini"><img src = {`http://127.0.0.1:5000/image/${image}`} alt="mini" className="mini"/></div>
            <div className="info"><h2>{mark}</h2>
                <p><b>MODEL: </b>{model}</p>
                <p><b>FUEL: </b>{fuel}</p>
                <p><b>PRICE: </b>{price}$ for DAY</p>
            </div>
        </div>
        <div className="calendar">
            <div className="st">
                <label htmlFor="start">Start date:</label>
                <input type="date" id="start" name="trip-start"
                    value={start}
                    onChange={event => handlechange(event)}
                    min={min.toISOString().split('T')[0]} max={new Date(min.getTime()+30*86400000).toISOString().split('T')[0]}/>
            </div>
            <div className="en">
                <label htmlFor="end">End date:</label>
                <input type="date" id="end" name="trip-end"
                    value={end}
                    onChange={event => setEnd(event.target.value)}
                    min={new Date(new Date(start).getTime()+86400000).toISOString().split('T')[0]} max={new Date(new Date(start).getTime()+30*86400000).toISOString().split('T')[0]}/>
            </div>
            
        </div>
        <div className="brent">
            {sessionStorage.user ? <button className="butr" onClick={addrent}>RENT</button>:<button className="butr" onClick={toregist}>RENT</button>}
        </div>
    </div>
    </>
  )
}

export default Autic