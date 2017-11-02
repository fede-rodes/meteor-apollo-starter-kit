// imports

//------------------------------------------------------------------------------
const user = (root, args, context) => (
  // We access to the current user here thanks to the context. The current
  // user is added to the context thanks to the 'meteor/apollo' package.
  context.user
);
//------------------------------------------------------------------------------
const Query = {
  user,
};

export default Query;
