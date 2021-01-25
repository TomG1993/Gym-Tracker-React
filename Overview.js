import React, { useState, useEffect } from 'react';
import SessionHeader from './SessionHeader.js'


const Overview = (props) => {

  const [headers, setHeaders] = useState([]);
  const [newSessionName, setNewSessionName] = useInput({ type: "text" });


  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    console.log("fetching headers");
    getHeaders();
  }, []);

  function useInput({ type /*...*/ }) {
    const [value, setValue] = useState("");
    const input = <input value={value} placeholder="Session Name" onChange={e => setValue(e.target.value)} type={type} />;
    return [value, input];
  }


  const getHeaders = async () => {
    const url = "https://localhost:44367/GetHeaders?userId=" + props.activeUser();
    const response = await fetch(url,
      {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + props.token
        },
      });

    const data = await response.json();
    var arr = [];
    Object.keys(data).forEach(function (key) {
      arr.push(data[key]);
    });
    console.log(arr);
    setHeaders(arr);
  }

  const addSession = async () => {
    console.log("Adding new session");

    console.log(newSessionName);

    const [lastItem] = headers.slice(-1)

    const newId = lastItem.id + 1;

    var newSessionHeader = { sessionName: newSessionName, id: newId };

    await saveNewSession();

    setHeaders(currentHeaders => [...currentHeaders, newSessionHeader]);
  }

  const saveNewSession = async () => {

    const url = "https://localhost:44367/AddSessionHeader";
    const response = await fetch(url,
      {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionName: newSessionName,
          UserId: props.activeUser()
        })
      });

  }

  return (
    <div>

      <button onClick={addSession} className='inputBase button addButton'><span role="img" aria-label="stats">&#x2795;</span>Add</button>
      <div>{setNewSessionName}</div>
      <div >
        {
          headers.map(header => <SessionHeader key={header.id} id={header.id} sessionName={header.sessionName} />)
        }
      </div>
    </div>
  )
}

export default Overview;