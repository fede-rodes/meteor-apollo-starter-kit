// Users namespace user resolvers
const User = {};

//------------------------------------------------------------------------------
// We need to tell graphql how to resolve the 'services' field inside the User
// query. We could also define resolver functions for the rest of the User
// fields, but if we don't do that graphql will default to the field values,
// which is exactly what we want.
User.services = (root, args, context) => {
  // Get current user
  const { user } = context;

  // In case user is not logged in, return no services
  if (!user) {
    return [];
  }

  // TODO: we should only return current loggedIn service instead of all
  // available services
  return (user.services && Object.keys(user.services)) || [];
};
//------------------------------------------------------------------------------

export default User;
