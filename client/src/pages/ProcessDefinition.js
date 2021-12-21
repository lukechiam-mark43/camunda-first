import React, { useState, useEffect, useContext } from 'react';

const baseUrl = 'http://localhost:3001'

export default function ProcessDefinition() {
  const [pdList, setPdList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/process-definition')
      .then(response => response.json())
      .then(data => setPdList(data));
  }, []);

  return (
    <div>
      <h1>Processes</h1>
      <hr/>
      <ol>
        {pdList.map(item => {
          return <li key={item.key}>{item.key} <button onClick={() => startProcess(item.key)}>Start</button></li>
        })}
      </ol>
    </div>
  );

  function startProcess(pdKey) {
    // Start a process
    fetch(`${baseUrl}/process-definition/key/${pdKey}/start`, {method: 'POST'})
      .then(response => response.json())
      .then(data => {
        if (data.definitionId.includes(pdKey)) {
          console.log(`Process started: ${data.definitionId}`);
        }
      });
  }

  // List unassigned task of given process
  // fetch(`${baseUrl}/task?processDefinitionKey=${pdKey}&unassigned=true`)
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(`Task count: ${data.length}`);
  //   });

}
