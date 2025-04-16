import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [currency, setCurrency] = useState(null)
  const [rate, setRate] = useState(0)
  // const currencyConverter = (value) => {
  //   const newVal = value * 87
  //   useCallback(() => {
  //     setCurrency(newVal)
  //   }, [setCurrency])
  // }

  async function getConversionRate(){
    await fetch("https://v6.exchangerate-api.com/v6/850205f10d65e50c2df93f84/pair/USD/INR")
    .then(res => res.json())
    .then(data => {
      setRate(data.conversion_rate)
    })
  }
  useEffect(() => {
    getConversionRate()
  }, [])
  

  return (
    <>
    <div>
      <h1> Currency Converter </h1>
      <h3>USD to INR</h3>
      <input 
        type='text'
        onChange={ (e) => {
          setCurrency(e.target.value * rate)
        } }
      />
      <input
      type='text'
      value={currency}
      />
    </div>
    </>
  )
}

export default App
