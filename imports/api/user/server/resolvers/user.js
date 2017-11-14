// User resolvers
const User = {};

//------------------------------------------------------------------------------
// We need to tell graphql how to resolve the 'services' field inside the User
// query. We could also define resolver functions for the rest of the User
// fields, but if we don't do that graphql will default to the field values,
// which is exactly what we want.
User.services = (root, args, context) => (
  (context.user && context.user.services && Object.keys(context.user.services))
  || []
);
//------------------------------------------------------------------------------

export default User;
