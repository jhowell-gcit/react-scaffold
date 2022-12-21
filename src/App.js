import { useState } from "react";
import "./App.css";
import { ApiService } from "./services/api/api-services";
import { Box, Button, TextField } from "@mui/material";

function App() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [resErr, setResErr] = useState("");

  let getData = async (e) => {
    e.preventDefault();
    ApiService.getRequest(code, name).then((res) => {
      if (res.status === 200) {
        setResErr(false)
      } else {
        setResErr(true)
      }
      setCode("");
      setName("");
      setMessage(JSON.stringify(res.data, null, 2));
    });
  }

  return (
    <Box className="App">
      <form onSubmit={getData}>
        <Box>
          <TextField
            type="text"
            label="sampleCode"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Box>
        <Box mt={2}>
          <TextField
            type="text"
            label="sampleName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box mt={3}>
          <Button variant="contained" type="submit">GET</Button>
        </Box>
        <Box mt={4}>
          <Box className="message" color={resErr ? "red" : "green"}>{message ? <pre>{message}</pre> : null}</Box>
        </Box>
      </form>
    </Box>
  );
}

export default App;