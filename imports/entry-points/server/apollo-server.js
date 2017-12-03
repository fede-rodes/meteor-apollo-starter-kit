import { createApolloServer } from 'meteor/apollo';
import schema from '../../api/schema/server';

createApolloServer({ schema });
