import { useState } from "react";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [resErr, setResErr] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("/api/v1/sample-path?" + (code ? "sampleCode=" + code : "") + (name ? "&sampleName=" + name : ""), {
        method: "GET",
      })
      let resJson = await res.json();
      if (res.status === 200) {
        setCode("");
        setName("");
        setResErr(false)
      } else {
        setResErr(true)
      }
      setMessage(JSON.stringify(resJson, null, 2));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="sampleCode"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <input
          type="text"
          placeholder="sampleName"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">GET</button>

        <div className="message" style={resErr ? { color:"red" } : { color:"green" }}>{message ? <pre>{message}</pre> : null}</div>
      </form>
    </div>
  );
}

export default App;