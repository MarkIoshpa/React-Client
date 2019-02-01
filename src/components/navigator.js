import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Navigator component
class Navigator extends Component {
  render() {
    return (
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to={'/2018-2019/dcs/dev_179/'}>Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/2018-2019/dcs/dev_179/sport'>Trainers by Sport</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/2018-2019/dcs/dev_179/championship'>Manage Championships</Link>
          </li>
        </ul>
    </div>
      )
  }
}

export default Navigator;
