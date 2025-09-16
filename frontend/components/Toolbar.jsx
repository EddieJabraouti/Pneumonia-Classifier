import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Toolbar = () => {
  return (
 <div>
    <div>
        <div>
        <img src=''/>
            <h2>
                <span>
                    Clarity
                </span>
            </h2>
        </div>
    <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/About">About</Link>
            </li>
            <li>
                <Link to="/Technology">Technology</Link>
            </li>
            <li>
                <Link to="/model"></Link>
            </li>
        </ul>
    </nav>
    </div>
</div>
  )
}

export default Toolbar