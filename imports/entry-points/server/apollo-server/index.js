import { createApolloServer } from 'meteor/orcprogramming:meteor-apollo2';
import schema from './exec-schema';

createApolloServer({ schema });
