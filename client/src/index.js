import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout"
import User from "./pages/User"
import ProcessDefinition from './pages/ProcessDefinition'
import Task from './pages/Task'
import { UserProvider } from './UserContext'

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="my-profile" element={<User />} />
            <Route path="processes" element={<ProcessDefinition />} />
            <Route path="tasks" element={<Task />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

ReactDOM.render(<App/>, document.getElementById('root'));
