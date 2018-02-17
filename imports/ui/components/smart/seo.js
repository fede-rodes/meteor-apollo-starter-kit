// Source: https://themeteorchef.com/tutorials/reusable-seo-with-react-helmet
import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import Constants from '../../../api/constants';

const { appId } = Meteor.settings.public.facebook;

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const seoURL = path => Meteor.absoluteUrl(path);
//------------------------------------------------------------------------------
const getMetaTags = ({
  title,
  description,
  url,
  contentType,
  twitter,
}) => {
  const metaTags = [
    { itemprop: 'name', content: title },
    { itemprop: 'description', content: description },
    { name: 'description', content: description },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: Constants.SITE_TWITTER },
    { name: 'twitter:title', content: `${title} | ${Constants.SITE_BRAND}` },
    { name: 'twitter:description', content: description },
    { name: 'twitter:creator', content: twitter || Constants.SITE_TWITTER },
    { name: 'og:title', content: `${title} | ${Constants.SITE_BRAND}` },
    { name: 'og:type', content: contentType },
    { name: 'og:url', content: url },
    { name: 'og:description', content: description },
    { name: 'og:site_name', content: Constants.SITE_BRAND },
    { name: 'fb:app_id', content: appId },
  ];

  return metaTags;
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SEO = ({
  location,
  schema,
  title,
  description,
  contentType,
  twitter,
}) => (
  <Helmet
    htmlAttributes={{
      lang: 'en',
      itemscope: undefined,
      itemtype: `http://schema.org/${schema}`,
    }}
    title={title}
    link={[
      { rel: 'canonical', href: seoURL(location.pathname) },
    ]}
    meta={getMetaTags({
      title,
      description,
      contentType,
      url: seoURL(location.pathname),
      twitter,
    })}
  />
);

SEO.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  schema: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  contentType: PropTypes.string.isRequired, // see Object Types at https://developers.facebook.com/docs/reference/opengraph/
  twitter: PropTypes.string,
};

SEO.defaultProps = {
  description: '',
  twitter: '',
};

export default withRouter(SEO);
