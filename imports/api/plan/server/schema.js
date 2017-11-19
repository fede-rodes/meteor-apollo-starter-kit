// Plan namespace schema
const schema = `
  type Plan {
    _id: String!
    planId: String!
    label: String!
    price: String!
  }

  type Query {
    plans: [Plan]
  }
`;

export default schema;
