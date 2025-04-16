import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(6)
  const [numberAllow, setNumberAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback( () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllow) str += "0123456789";
    if (charAllow) str += "!@#$%^&*_+?<>";

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllow, charAllow, setPassword])

  const copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllow, charAllow, setPassword ])

  return (
    <>
      <h2 id='passId'>Password Generator</h2>
      <div id='mydiv'>
        <input
        id='myinput'
        type='text'
        value={password}
        placeholder='password'
        readOnly
        ref={passwordRef}
        />
        <button onClick={copyPassword}>Copy</button>
          <input 
            type='range'
            min={6}
            max={20}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {
              setLength(e.target.value)
            }}
          />
          <lable> Length: {length} </lable>
          <div className="checkbox-wrapper">
            <input 
              type='checkbox'
              defaultChecked={setNumberAllow}
              id='numberInput'
              onChange={(e) => {
                setNumberAllow((prev) => !prev)
              }}
            />
            <label htmlFor='numberInput'>Number</label>
          </div>

          <div className="checkbox-wrapper">
            <input 
              type='checkbox'
              defaultChecked={setCharAllow}
              id='charInput'
              onChange={(e) => {
                setCharAllow((prev) => !prev)
              }}
            />
            <label htmlFor='charInput'>Char</label>
          </div>
      </div>
    </>
  )
}

export default App
