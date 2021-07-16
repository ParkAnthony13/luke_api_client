import React, { useEffect,useState } from 'react'
import { Link, navigate } from '@reach/router'
import axios from "axios"




const Planets = props => {

    const { formState,setFormState } = props
    const [planets, setPlanets] = useState(0)
    const [error,setError] = useState(false)

    useEffect(() => {
        console.log("start")
        axios.get(`https://swapi.dev/api/planets/${formState.num}`)
            .then(response => {
                setPlanets(response.data)
                console.log(response.data)
                setError(false)
            })
            .catch(err => {
                console.log(`Encountered Error: ${err}`)
                setError(true)
            })
    }, [error])

    return (
        <div>
            {error ? <div><img className="obi" src={'https://i.kym-cdn.com/entries/icons/original/000/018/682/obi-wan.jpg'} alt="obi"/><h1 style={{color:"red"}}>These are not the Droids you are looking for!</h1></div>
            : <div style={{display:"flex",flexDirection:"column",justifyContent:"space-evenly",alignItems:"center",width:"50%",margin:"auto"}}>
                <h1>{planets.name}</h1>
                <div style={{display:"flex",alignItems:"center"}}>
                    <h3 style={{margin:"6px"}}>Climate:</h3>
                    <p>{planets.climate}</p>
                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <h3 style={{margin:"6px"}}>Terrain:</h3>
                    <p>{planets.terrain}</p>
                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <h3 style={{margin:"6px"}}>Surface Water:</h3>
                    {planets.surface_water===0 ? <p>False</p> : <p>True</p>}
                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <h3 style={{margin:"0 6px"}}>Population:</h3>
                    <p>{planets.population}</p>
                </div>
            </div>
            }
        </div>
    )
}

export default Planets