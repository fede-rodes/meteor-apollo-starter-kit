import { createApolloServer } from 'meteor/orcprogramming:apollo';
import schema from './exec-schema';

createApolloServer({ schema });
