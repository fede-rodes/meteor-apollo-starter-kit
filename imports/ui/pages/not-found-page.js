import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/smart/seo';
import Title from '../components/dumb/title';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const NotFoundPage = () => (
  <div>
    <SEO
      schema="AboutPage"
      title="Page Not Found"
      description="A starting point for Meteor applications."
      contentType="product"
    />
    <Title>404 - Page Not Found</Title>
    <p className="center">
      Back to <Link to="/">Home</Link>
    </p>
  </div>
);

export default NotFoundPage;
