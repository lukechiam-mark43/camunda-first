import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../UserContext'

export default function Task() {
  const [allTasks, setAllTasks] = useState([])
  const [myTasks, setMyTasks] = useState([])
  const [isPriority, setPriority] = useState(false)
  const [isApproved, setApproved] = useState(false)
  const [taskId, setTaskId] = useState(null)
  const user = useContext(UserContext)
  const baseUrl = 'http://localhost:3001'

  useEffect(() => {
    getTasks(null)
    getTasks(user.id)
  }, [])

  return (
    <div>
      <h1>Tasks</h1>
      <hr/>
      Data to send:
      <input type="checkbox" onChange={(event) => setPriority(!isPriority)} /> Priority? [{isPriority}]
      <input type="checkbox" onChange={(event) => setApproved(!isApproved)} /> Approved?<br />

      <h2>All Tasks</h2>
      <hr/>
      <ol>
        {allTasks.map(item => {
          return (
            <li key={item.id}>{item.name}
              <button onClick={() => claimTask(item.id)}>Claim</button>
              <button onClick={() => completeTask(item.id)}>Complete</button>
              ({item.id})
            </li>
          )
        })}
      </ol>

      <h2>My Tasks</h2>
      <hr/>
      <ol>
        {myTasks.map(item => {
          return (
            <li key={item.id}>{item.name}
              <button onClick={() => completeTask(item.id)}>Complete</button>
              ({item.id})
            </li>
          )
        })}
      </ol>

      <h3>Task by ID</h3>
      <input type="text" size="40" value={taskId} onChange={(event) => setTaskId(event.target.value)} />
      <button onClick={() => completeTask(taskId)}>Complete</button>

    </div>
  )

  // Get all tasks if userId is null or user's tasks
  async function getTasks(userId) {
    const reqUrl = 'http://localhost:3001' + ((userId === null) ? '/task' : '/task?assignee=' + userId)
    const response = await fetch(reqUrl)
    const data = await response.json(response)
    if (userId === null) {
      console.log(`All task found: ${data.length}`)
      setAllTasks(data)
    } else {
      console.log(`User's task found: ${data.length}`)
      setMyTasks(data)
    }
  }

  async function completeTask(taskId) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({variables: {priority: {value: isPriority}, approved: {value: isApproved}}})
    }

    await fetch(`${baseUrl}/task/${taskId}/complete`, requestOptions)
    console.log(`Task completed: ${taskId}`)
    getTasks(null)
    getTasks(user.id)
  }

  async function claimTask(taskId) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id })
    }

    await fetch(`${baseUrl}/task/${taskId}/claim`, requestOptions)
    console.log(`Task claimed: ${taskId}`)
    getTasks(user.id)
  }
}
