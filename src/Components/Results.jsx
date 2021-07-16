import React, { useEffect,useState } from 'react'
import { Link, navigate } from '@reach/router'
import axios from "axios"




const Results = props => {

    const { formState } = props
    const [people, setPeople] = useState(0)
    const [error,setError] = useState(false)
    const [errorHome,setErrorHome] = useState(false)
    const [home,setHome] = useState("")

    useEffect(() => {
        console.log("Person")
        axios.get(`https://swapi.dev/api/people/${formState.num}`)
            .then(response => {
                setPeople(response.data)
                console.log(response.data)
                setError(false)
            })
            .catch(err => {
                console.log(`Encountered Error: ${err}`)
                setError(true)
            })
    }, [error])

    useEffect(() => {
        console.log("Home Finder")
        axios.get(`${people.homeworld}`)
            .then(response => {
                setHome(response.data)
                console.log(response.data)
                setErrorHome(false)
            })
            .catch(err => {
                console.log(`Encountered Error: ${err}`)
                setErrorHome(true)
            })
    }, [people])

    return (
        <div>
            {error ? <div><img className="obi" src={'https://i.kym-cdn.com/entries/icons/original/000/018/682/obi-wan.jpg'} alt="obi"/><h1 style={{color:"red"}}>These are not the Droids you are looking for!</h1></div>
            : <div style={{display:"flex",flexDirection:"column",justifyContent:"space-evenly",alignItems:"center",width:"50%",margin:"auto"}}>
                <h1>{people.name}</h1>
                <h3>{people.homeworld}</h3>
                {errorHome ? <h3>{home.name}</h3> : null}
                <div style={{display:"flex",alignItems:"center"}}>
                    <h3 style={{margin:"6px"}}>Height:</h3>
                    <p>{people.height}</p>
                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <h3 style={{margin:"6px"}}>Mass:</h3>
                    <p>{people.mass} kg</p>
                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <h3 style={{margin:"6px"}}>Hair Color:</h3>
                    <p>{people.hair_color}</p>
                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <h3 style={{margin:"0 6px"}}>Skin Color:</h3>
                    <p>{people.skin_color}</p>
                </div>
            </div>
            }
        </div>
    )
}

export default Results