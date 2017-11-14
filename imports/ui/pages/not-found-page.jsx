import React from 'react';
import { Link } from 'react-router-dom';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const NotFoundPage = () => (
  <div className="full-width">
    <h1 className="center">404 - Page Not Found</h1>
    <p className="center">Back to <Link to="/">Home</Link></p>
  </div>
);

export default NotFoundPage;
