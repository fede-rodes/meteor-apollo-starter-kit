//------------------------------------------------------------------------------
// We access to the current user here thanks to the context. The current
// user is added to the context thanks to the 'meteor/apollo' package.
const user = (root, args, context) => (
  context.user
);
//------------------------------------------------------------------------------

export default user;
