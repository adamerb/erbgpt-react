import { useState } from "react"


const App = () => {
  const [value,setValue] = useState('')
  const [message, setMessage] = useState(null)

  const getResponse = async () => {
    setValue('')
    const options = {
        method: 'POST',
        body: JSON.stringify({
            message: value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
    }
      try {
        const response = await fetch('http://localhost:8000/completions', options)
        const data = await response.json()
        setMessage(data.choices[0].message)
      } catch (error) {
        console.error(error)
      }
  }

  return (
    <div className="app">
      <section className="side-bar">
        <button id="new-chat-button" onClick={()=>{
          setMessage('')
          setValue('')
          }}>+ &ensp;New chat</button>
        <ul className="history">
          <li>Previous Response</li>
        </ul>
        <nav>
          <p>Made by Adam Erb</p>
        </nav>
      </section>
      <section className="main">
          <h1>ErbGPT</h1>
          <div className="output">
            {message ? message.content: null}
          </div>
          <div className="bottom-section">
            <div className="input-container">
              <input value={value} onChange={(e) => setValue(e.target.value)}/>
              <div id="submit" onClick={getResponse}>➢</div>
            </div>
            <p className="info">
              ChatGPT Mar 23 Version. 
              Free Research Preview. 
              ChatGPT may produce inaccurate information about people, places, or facts
            </p>
          </div>
      </section>
    </div>
  );
}

export default App
