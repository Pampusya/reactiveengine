import React from 'react'
import './esa/profilic.scss'
import Carline from './carline/carline' 
import axios from 'axios';
import {useState,useEffect} from 'react'

const Profilic = () => {
    const [cars,setCars] = useState([])
    const [showedit,setShowedit] = useState(false)
    const [changes,setChanges] = useState("")
    const [nickname,setNickname] = useState("")
    const [file,SetFile] = useState(null)
    const [filename,SetFileName] = useState('')
    const [color,SetColor] = useState("#FFA500")
    const [colorw,SetColorw] = useState("#ffff")
    const [image,SetImage] = useState("")
    const [content1,SetContent] = useState("Select photo")
    const handlechange = (e) => {
        if (e.target.files){
          var formData = new FormData()
          formData.append("image",e.target.files[0])
          SetFile(formData)
          SetFileName(e.target.files[0].name)
          SetContent("file uploaded")

        }
    }
    const Goout=() => {
        sessionStorage.removeItem("bearer")
        sessionStorage.removeItem("user")
        window.location.href = "/in";
    }
    const Sendname = async() => {
        if(changes){
        const user = JSON.parse(sessionStorage.user)
        const body = {"first_name":changes}
        const about = (await axios.put(`http://127.0.0.1:5000/user/${user["id_user"]}`, body, 
        {headers:{"Authorization": `Bearer ${sessionStorage.getItem("bearer")}`}}))["data"]
        setNickname(about["first_name"])
        user["first_name"]=about["first_name"]
        sessionStorage["user"] = JSON.stringify(user)
        setShowedit(!showedit)}
        if(file){
            const imgcode = (await axios.put(`http://127.0.0.1:5000/image/user`, file,
            {headers:{"Authorization": `Bearer ${sessionStorage.getItem("bearer")}`,  "Content-Type": "multipart/form-data"}}))["data"]
            let user = JSON.parse(sessionStorage.getItem("user"))
            user["image"] = filename
            sessionStorage["user"] = JSON.stringify(user)
            
            window.location.reload(false);
        }
    }

    useEffect(()=>{
        const user = JSON.parse(sessionStorage.getItem("user"))
        setNickname(user["first_name"])
        SetImage(user["image"])
        const info = document.getElementById("nameandemail");
        const out = document.getElementById("log_out");
        //info.innerHTML = `<b style="font-size: 35px;${nickname}</b><br><br>${user["email"]}<br><br>`
        const fetch_data = async() => {
            const info = (await axios.get(`http://127.0.0.1:5000/rent/by_user_id/${user["id_user"]}`,
            {headers:{"Authorization": `Bearer ${sessionStorage.getItem("bearer")}`}}))["data"]
            const filtermashina = []
            for (let i of info) {
                if(new Date(i["end_of_lease"]).getTime() >= new Date().getTime()){
                    filtermashina.push(i)
                }
            }
            console.log(info)
            const result = []
            const chunkSize = 2

            for (let i = 0; i < filtermashina.length; i += chunkSize) {
                const chunk = filtermashina.slice(i, i + chunkSize);
                result.push(chunk)
            }
            
            setCars(result)
        }
        fetch_data()
    },[])
    
    return (
    <>
    {showedit ? 
    <div className="edit_back">
        <div className="changes_edit">
            <label htmlFor="newname">Upload image</label><br/>
            <input className="iconin"  data-content={content1} type="file" onChange={handlechange}/>
            <label htmlFor="newname" >Enter new nickname</label>
            <input type="text" placeholder="nickname" id="" value={changes} onChange={e => setChanges(e.target.value)}/>
            <div className="butonsu">
                <div className="buttonchange" >
                    <button id="send" onClick={Sendname} >Send</button>
                </div>
                <div className="buttonchange" >
                    <button id="close" onClick={()=>setShowedit(!showedit)}>Close</button>
                </div>
            </div>
        </div>
    </div>:
    <></>}
    <div className="allpfofile">
        <div className="pcard">
            <div className="pimg"><img src={`http://127.0.0.1:5000/image/user/${image}`}/></div>
            <div className="content">
                <div className = "initials" id = "infointials">
                    <div id = "nameandemail">
                        <b>{nickname}</b><br/><br/>{JSON.parse(sessionStorage.getItem("user"))["email"]}<br/><br/>
                    </div>
                    <div className="butonsu">
                        <div className="buttonedit" >
                            <button id="log_out" onClick = {Goout}>Log out</button>
                        </div>
                        <div className="buttonedit" >
                            <button id="edit" onClick={()=>setShowedit(!showedit)}>Edit</button>
                        </div>
                    </div>   
                </div>
            </div>
        </div> 
    <div className="blocks"><h2>My rents</h2>
        <div className="conteinercars"> 
            {cars && cars.map((element, index) => <Carline key = {index} cars = {element}/>)}
        </div>    
    </div>
    
    </div>
    
    </>
  )
}
export default Profilic