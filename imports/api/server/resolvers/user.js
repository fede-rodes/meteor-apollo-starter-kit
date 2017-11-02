import { Random } from 'meteor/random';

//------------------------------------------------------------------------------
const randomString = () => (
  Random.id()
);
//------------------------------------------------------------------------------
// We need to tell graphql how to resolve the 'randomString' field inside the
// User query. We could also define resolver functions for the rest of the
// User fields, but if we don't do that graphql will default to the field
// values, which is exactly what we want.
const User = {
  randomString,
};

export default User;
