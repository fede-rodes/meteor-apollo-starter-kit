import { createApolloServer } from 'meteor/apollo';
import schema from '../../api/schema/server/index.js';

createApolloServer({ schema });
