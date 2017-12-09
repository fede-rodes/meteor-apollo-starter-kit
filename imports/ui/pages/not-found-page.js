import React from 'react';
import { Link } from 'react-router-dom';
import Title from '../components/dumb/title';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const NotFoundPage = () => (
  <div>
    <Title>404 - Page Not Found</Title>
    <p className="center">Back to <Link to="/">Home</Link></p>
  </div>
);

export default NotFoundPage;
