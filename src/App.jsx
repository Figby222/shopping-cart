import './App.css'
import { useParams } from 'react-router-dom'
import { useState } from "react";
import Homepage from "./components/Homepage/Homepage.jsx";
import Store from './components/Store/Store.jsx';

function App() {
  const { name } = useParams();
  const [ cart, setCart ] = useState([]);
  return (
    <>
      {name === "store" ? 
        <Store cart={cart} setCart={setCart} /> :
        <Homepage />
      }
    </>
  )
}

export default App
