import React from 'react'
import './esa/catalic.scss'
import suv from './foto/suv.png'
import truck from './foto/truck.png'
import sportcar from './foto/sportcar.png'
import homecar from './foto/homecar.png'
import { useEffect,useState } from 'react'
import Window_create from './Window_create' 

const Catalic = () => {
    const [adminmode,setAdmin] = useState(false)
    const [showcreate,setCreate] = useState(false)
    useEffect(()=>{
        const url = "http://127.0.0.1:5000/cars"
        const conteiner = document.getElementsByClassName("conteinercars")[0]
        const usual =  document.getElementById("t1")
        const sportcars =  document.getElementById("t2")
        const suvs =  document.getElementById("t3")
        const trucks =  document.getElementById("t4")

        mycars("cars")

        function firstrequest(metod, url){
            const headers = {
                'Content-Type': 'application/json'
            }
            return fetch(url, {
                method: metod,
                headers: headers
            }).then(response => {
                return response.json()
            })
        }

        function mycars(category) {
            firstrequest("GET", url)
            .then(data => {let cars = data.filter(data=>data["category"]===category); console.log(cars, category, data); cardrow(cars)})
        }

        function cardrow(cars){
            var lines = [];
            conteiner.innerHTML = "";
            for ( let i = 0; i < cars.length/2; i++){
                var line = document.createElement("div")
                line.className = "carline";
                lines.push(line);
            }
            for ( let i = 0; i < cars.length; i++){
                let carlist = document.createElement("a");
                carlist.href=`/car/${cars[i]['id_car']}`
                carlist.innerHTML = `
                <div class="alreadycar" >
                    <div class="rentcarimage"><img src="http://127.0.0.1:5000/image/${cars[i]["image"]}" alt="imagecars" class="img"></div>
                    <div class="textrent"><b>${cars[i]["mark"]}</b><br>${cars[i]["model"]}<br>${cars[i]["fuel"]}</div>
                    <div class="textrentprice"><b>$${cars[i]["price_per_day"]}/day</b></div>
                </div>`
                lines[Math.floor(i/2)].append(carlist)
                console.log(lines)
            }
            for ( let i = 0; i < cars.length/2; i++){
                conteiner.append(lines[i])
            }
        }

        usual.addEventListener("click", (e)=>{let categ = e.target.getAttribute("name");
        mycars(categ)})
        sportcars.addEventListener("click", (e)=>{let categ = e.target.getAttribute("name");
        mycars(categ)})
        suvs.addEventListener("click", (e)=>{let categ = e.target.getAttribute("name");
        mycars(categ)})
        trucks.addEventListener("click", (e)=>{let categ = e.target.getAttribute("name");
        mycars(categ)})
    },[])
    useEffect(()=>{
        if(sessionStorage.getItem("user") && JSON.parse(sessionStorage.getItem("user"))["role"]=="Role.admin"){
            setAdmin(true)
        }
    },[])
    return (
    <>
    <div className ="slider middle">
        <div className="slides">
            <input type="radio" name="r" id="r1" onChange={()=>{}} defaultChecked={true}/>
            <input type="radio" name="r" id="r2" onChange={()=>{}} />
            <input type="radio" name="r" id="r3" onChange={()=>{}} />
            <input type="radio" name="r" id="r4" onChange={()=>{}} />

           <div className="slide s1">
              <img src={homecar} alt="imagecars" className="img"/>           
           </div>
           <div className="slide s2">
              <img src={sportcar} alt="imagecars" className="img"/>
           </div>
           <div className="slide s3">
              <img src={suv} alt="imagecars" className="img"/>
           </div>
           <div className="slide s4">
              <img src={truck} alt="imagecars" className="img"/>
           </div>
        </div>
        
     </div>
     <div className="category">
        <label htmlFor="r1" ><h1 id="t1" name="cars" >CARS</h1></label>
        <label htmlFor="r2" ><h1 id="t2" name="sportcars" >SPORTCARS</h1></label>
        <label htmlFor="r3" ><h1 id="t3" name="suvs" >SUVS</h1></label>
        <label htmlFor="r4" ><h1 id="t4" name="trucks" >TRUCKS</h1></label>
    </div>
    
    <div className="conteinercars"></div>
    
    {adminmode && <div className="create_car">
        <button className="create_button" onClick={()=>setCreate(!showcreate)}><div className="plus">+</div></button>
    </div>}
    {showcreate && <Window_create setShow={setCreate}/>}
    </>
  )
}

export default Catalic