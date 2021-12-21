import React, { useState, useContext } from 'react';
import UserContext from '../UserContext'

export default function User() {
  const user = useContext(UserContext)
  const [userId, setUserId] = useState(-1)

  function onUserChange(event) {
    setUserId(event.target.value)
  }

  function selectUser() {
    user.id = userId;
    console.log(`Set User in context: ${user.id}`)
  }

  return (
    <div>
      <label>User: </label>
      <input type="text" onChange={ onUserChange } />
      <button onClick={ selectUser }>Set User</button>
      <br /><br /><br />
      Currently selected User ID is { user.id }
    </div>
  );
}
