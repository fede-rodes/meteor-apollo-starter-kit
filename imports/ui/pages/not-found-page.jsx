import React from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from '../layouts/default/default-layout';

const NotFoundPage = () => (
  <DefaultLayout width="600px" padding="20px 15px 0" centered>
    <h1 className="center">404 - Page Not Found</h1>
    {/* <p className="center">Back to <a href="/jeans">Jeans</a></p> */}
    <p className="center">Back to <Link to="/jeans">Jeans</Link></p>
  </DefaultLayout>
);

export default NotFoundPage;
