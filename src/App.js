import './App.css';
import React,{ useEffect, useState } from 'react';
import axios from "axios"
import {navigate, Router} from '@reach/router'

import Results from './Components/Results'
import Planets from './Components/Planets'



function App() {

  const [category,setCategory] = useState("") 
  const [id,setId] = useState(1)
  
  const [formState,setFormState] = useState({
    cat: "people",
    num: 1
  })

  const handleChange = (event) => {
    const {name,value} = event.target
    setFormState({
      ...formState,
      [name]:value
    })
    console.log(formState)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(category)
    navigate(`/${formState.cat}/${formState.num}`)
  }

  useEffect(() => {
    console.log("start")
    axios.get("https://swapi.dev/api/")
        .then(response => {
            setCategory(response.data)
        })
        .catch(err => console.log(`Encountered Error: ${err}`))
  },[])


  return (
    <div className="App">
      <form onSubmit={ handleSubmit } style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",width:"50%",margin:"auto"}}>
        <p>Search for:</p>
        <select onChange={ handleChange } name="cat">
          {category ? Object.keys(category).map( (cat, idx) => {
            return( <option value={cat} key={idx}>{cat}</option>)
          }):null}
        </select>
        <label for="num">ID:</label>
        <input type="number" name="num" onChange={ handleChange } style={{width:"10%"}}/>
        <input type="submit" value="Search" style={{backgroundColor:"blue",color:"white"}}/>
      </form>
      <Router>
        <Results path="/people/:item" formState={formState}/>
        <Planets path="/planets/:item" formState={formState}/>
      </Router>
    </div>
  );
}

export default App;
