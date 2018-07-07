import React from 'react';
import { propType } from 'graphql-anywhere';
import userFragment from '../../apollo-client/user/fragment/user';
import SEO from '../../components/smart/seo';
import AuthPageLayout from '../../layouts/auth-page';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const AdminPage = ({ curUser }) => [
  <SEO
    key="seo"
    schema="AboutPage"
    title="Admin Page"
    description="A starting point for Meteor applications."
    contentType="product"
  />,
  <AuthPageLayout
    key="view"
    title="Admin Page :)"
  >
    <pre style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
      {JSON.stringify(curUser, null, 2)}
    </pre>
  </AuthPageLayout>,
];

AdminPage.propTypes = {
  curUser: propType(userFragment).isRequired,
};

export default AdminPage;
