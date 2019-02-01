import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Navigator component
class Navigator extends Component {
  render() {
    return (
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to={'/'}>Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/sport'>Trainers by Sport</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/championship'>Manage Championships</Link>
          </li>
        </ul>
    </div>
      )
  }
}

export default Navigator;
