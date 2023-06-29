import { MapContainer, TileLayer } from "react-leaflet"
import { useState, useEffect, useRef } from "react"
import MarkerPosition from "./MarkerPosition"
import iconArrowUrl from "../images/icon-arrow.svg"
import "./App.css"

export default function App() {

  const [isIp, setIsIP] = useState()
  const [ip, setIP] = useState("192.212.174.101")
  const [domain, setDomain] = useState("")
  const [data, setData] = useState({
    ip: "192.212.174.101",
    isp: "Southern California Edison",
    location: {
      region: "California",
      country: "US",
      timezone: "-07:00",
      lat: 34.04915,
      lng: -118.09462
    }
  })

  const inputRef = useRef()
  const formRef = useRef()
  const API_KEY=at_hv3UPa3n7TWDomO3dtQd8ACogGBBp

  useEffect(() => {
    if(ip === "192.212.174.101" && domain === "") return
    try{
      async function getDataByIp(){
        const type = isIp ? "ipAddress" : "domain"
        const information = isIp ? ip : domain

        const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&${type}=${information}`)
        
        if(!res.ok){
          formRef.current.classList.add("error")
          return
        }
        const data = await res.json()
        setData(data)
      }
      getDataByIp()
    }catch(error){
      console.log(error)
    }

  }, [ip, domain])

  const handleSubmit = (event) => {
    event.preventDefault()

    const data = inputRef.current.value

    if(data === "") return

    const checkIP =   /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi
    const checkDomain = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/

    if(checkIP.test(data)){
      setIP(data)
      setIsIP(true)
      formRef.current.classList.remove("error")
    }
    else if(checkDomain.test(data)){
      setDomain(data)
      setIsIP(false)
      formRef.current.classList.remove("error")
    }
    else{

      formRef.current.classList.add("error")
    }
  }

  return (
    <main>

      <header>
        <h1> IP Address Tracker </h1>

        <form onSubmit={handleSubmit} ref={formRef}>
          <input type="text" placeholder="Search for any IP address or domain" ref={inputRef}/>
          <button>
            <img src={iconArrowUrl} alt="Arrow Icon" />
          </button>
        </form>

        <section>
          <div>
            <h3> IP Address </h3>
            <h2> {data.ip} </h2>
          </div>
          <div className="line"></div>
          <div>
            <h3> Location </h3>
            <h2> {data.location.region}, {data.location.country}</h2>
          </div>
          <div className="line"></div>
          <div>
            <h3> Timezone </h3>
            <h2> UTC {data.location.timezone} </h2>
          </div>
          <div className="line"></div>
          <div>
            <h3> ISP </h3>
            <h2> {data.isp} </h2>
          </div>
        </section>

      </header>

      <MapContainer  center={[data.location.lat, data.location.lng]} zoom={13} doubleClickZoom={false} scrollWheelZoom={false} zoomControl={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerPosition coordenates={data}/>
      </MapContainer>

    </main>
  )
}
