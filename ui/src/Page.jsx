import React from 'react';
import { NavLink } from 'react-router-dom';

import Contents from './Contents.jsx';

function NavBar() {
  return (
    <nav>
      <NavLink exact to="/">Home</NavLink>
      {' | '}
      <NavLink to="/issues">Issue List</NavLink>
      {' | '}
      <NavLink to="/report">Report</NavLink>
      {' | '}
      <NavLink to="/about">About</NavLink>
    </nav>
  );
}

export default function Page() {
  return (
    <React.Fragment>
      <NavBar />
      <Contents />
    </React.Fragment>
  );
}
