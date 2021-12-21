import React, { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  const [state, setState] = useState({ ...{userId: -1} });

  function userChanged(e) {
    setState({ ...state, userId: e.target.value });
  }

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/my-profile">My Profile</Link>
          </li>
          <li>
            <Link to="/processes">Processes</Link>
          </li>
          <li>
            <Link to="/tasks">Tasks</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
}
