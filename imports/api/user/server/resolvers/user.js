import { Random } from 'meteor/random';

// User resolvers
const User = {};

//------------------------------------------------------------------------------
// We need to tell graphql how to resolve the 'randomString' field inside the
// User query. We could also define resolver functions for the rest of the
// User fields, but if we don't do that graphql will default to the field
// values, which is exactly what we want.
User.randomString = () => (
  Random.id()
);
//------------------------------------------------------------------------------

export default User;
