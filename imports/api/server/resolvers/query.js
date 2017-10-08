const Query = {
  user(root, args, context) {
    // We access to the current user here thanks to the context. The current
    // user is added to the context thanks to the `meteor/apollo` package.
    return context.user;
  },
};

export default Query;
