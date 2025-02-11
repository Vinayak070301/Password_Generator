import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [charAllowed, setcharAllowerd] = useState(false)
  const [password, setpassword] = useState('')
  const [numAllowed, setnumAllowed] = useState(false)

  const passwordgenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*"

    for (let index = 1; index <= length; index++) {
      let ch = Math.floor(Math.random() * str.length)  // Fixed off-by-one error
      pass += str.charAt(ch)
    }
    setpassword(pass)
  }, [length, numAllowed, charAllowed])

  useEffect(() => {
    passwordgenerator()
  }, [length, numAllowed, charAllowed, passwordgenerator])

  const passwordref=useRef(null)

  const copyclipboard=useCallback(()=>{
    passwordref.current?.select();
    
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
      <div className="container w-auto bg-cyan-500 h-56 rounded-xl">
        <h1>Password Generator</h1>
        <div className='flex container-1 p-10 justify-items-center space-x-2' >
          <div>
            <input 
              className='w-96 h-12 rounded-lg white' 
              type="text" 
              name="password" 
              id="in-password" 
              value={password} 
              ref={passwordref}
              readOnly
            />
          </div> 
          <div> 
            <button onClick={copyclipboard}>
               Copy 
            </button> 
          </div>
        </div> 
        <div className='container-2 flex justify-center space-x-6'>
          <div>
            <input 
              type="range" 
              onChange={(e) => setLength(Number(e.target.value))} 
              name="length" 
              min={6} 
              max={40}
              value={length}
            /> 
            Length ({length}) 
          </div>
          <div>
            <input 
              type="checkbox"  
              onChange={() => setnumAllowed(prev => !prev)} 
              checked={numAllowed} 
            />
            Number 
          </div>
          <div>
            <input 
              type="checkbox" 
              onChange={() => setcharAllowerd(prev => !prev)} 
              checked={charAllowed}
            />
            Character 
          </div>
        </div>
      </div>
    </>
  )
}

export default App
