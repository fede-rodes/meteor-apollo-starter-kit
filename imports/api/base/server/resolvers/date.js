/**
 * Date resolver
 * @summary In all our models we're using the default Date data type. As Apollo
 * basically only supports strings and numbers to be transported, we define a
 * new scalar which is basically another type.
 * @see {@link https://janikvonrotz.ch/2016/10/09/graphql-with-apollo-meteor-and-react/}
 */
const Date = {};

//------------------------------------------------------------------------------
// Value from the client
Date.__parseValue = value => new Date(value);
//------------------------------------------------------------------------------
// Value sent to the client
Date.__serialize = value => value.toISOString();
//------------------------------------------------------------------------------
Date.__parseLiteral = ast => ast.value;
//------------------------------------------------------------------------------

export default Date;
