import React from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from '../layouts/default/index.jsx';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const NotFoundPage = () => (
  <DefaultLayout>
    <h1 className="center">404 - Page Not Found</h1>
    <p className="center">Back to <Link to="/">Home</Link></p>
  </DefaultLayout>
);

export default NotFoundPage;
