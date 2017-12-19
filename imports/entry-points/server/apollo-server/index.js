import { createApolloServer } from 'meteor/apollo';
import schema from './exec-schema';

createApolloServer({ schema });
