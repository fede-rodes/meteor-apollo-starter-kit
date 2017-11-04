// User query resolvers
const Query = {};

//------------------------------------------------------------------------------
// We access to the current user here thanks to the context. The current
// user is added to the context thanks to the 'meteor/apollo' package.
Query.user = (root, args, context) => (
  context.user
);
//------------------------------------------------------------------------------

export default Query;
