import React from 'react'
import './esa/catalic.scss'
import { useEffect,useState } from 'react'
import axios from 'axios';

const Window_create = ({setShow}) => {
    const [file,SetFile] = useState(null)
    const [filename,SetFileName] = useState('')
    const [mark,SetMark] = useState("")
    const [model,SetModel] = useState("")
    const [price,SetPrice] = useState("")
    const [serial_number,SetSerial_number] = useState("")
    const [category,SetCategory] = useState("cars")
    const [fuel,SetFuel] = useState("electric")
    const [color,SetColor] = useState("#FFA500")
    const [colorw,SetColorw] = useState("#ffff")

    const handlechange = (e) => {
        if (e.target.files){
          var formData = new FormData()
          formData.append("image",e.target.files[0])
          SetFile(formData)
          SetFileName(e.target.files[0].name)
          SetColorw("#ffff")
        }
    }
    const sendcar = async() => {
        const body = {"model":model,"mark":mark,"price_per_day":price,"serial_number":serial_number,"category":category,"fuel":fuel,"image":filename}
        if(file && price && serial_number && mark && model){
            const about = (await axios.post(`http://127.0.0.1:5000/car`, body, 
            {headers:{"Authorization": `Bearer ${sessionStorage.getItem("bearer")}`}}))["data"]
            const imgcode = (await axios.post(`http://127.0.0.1:5000/image`, file,
            {headers:{"Authorization": `Bearer ${sessionStorage.getItem("bearer")}`,  "Content-Type": "multipart/form-data"}}))["data"]
            setShow(false)   
        }
        else if(!price || !serial_number || !mark || !model){
            SetColor("red")
        }
        if(!file){
            SetColorw("red")
        }
    }
    return (
    <div className="window">
        <div className="write_foto">
            <label htmlFor="image">Upload image</label><br/>
            <div className="iconcar">
            <img src={require(`./foto/icon.png`)}/>          
            </div>
            <input className="iconin" style={{color: colorw}} type="file" onChange={handlechange}/>
            
        </div>
        <div className="write_fields">
            <label htmlFor="newname" >Enter mark</label>
            <input type="text" placeholder="mark" style={{borderColor: color}} value={mark} onChange={e => SetMark(e.target.value)} onClick={()=>SetColor("#FFA500")}/>
            <label htmlFor="newname" >Enter model</label>
            <input type="text" placeholder="model" style={{borderColor: color}} value={model} onChange={e => SetModel(e.target.value)} onClick={()=>SetColor("#FFA500")}/>
            <label htmlFor="newname" >Enter price for day</label>
            <input type="text" placeholder="price" style={{borderColor: color}} value={price} onChange={e => SetPrice(e.target.value)} onClick={()=>SetColor("#FFA500")}/>
            <label htmlFor="newname" >Enter serial number</label>
            <input type="text" placeholder="serial number" style={{borderColor: color}} value={serial_number} onChange={e => SetSerial_number(e.target.value)} onClick={()=>SetColor("#FFA500")}/>
            <label htmlFor="newname" >Choice category</label>
            <select value={category} onChange={e => SetCategory(e.target.value)}>
                <option value="cars">homecars</option>
                <option value="sportcars">sportcars</option>
                <option value="suvs">suvs</option>
                <option value="trucks">trucks</option>
            </select>
            <label htmlFor="newname" >Choice type of fuel</label>
            <select value={fuel} onChange={e => SetFuel(e.target.value)}>
                <option value="electric">electric</option>
                <option value="gasoline">gasoline</option>
            </select>
            <div className="buttonsu">
                <button className="create_but1" onClick={sendcar}>Create</button>
                <button className="create_but2" onClick={()=>setShow(false)}>Close</button>
            </div>
            
            
        </div>
    </div>
  )
}

export default Window_create