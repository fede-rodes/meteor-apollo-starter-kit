import collection from './collection.js';

// Attach namespace to collection for clarity
const Plan = { collection };

// Plan fixtures
const fixtures = {};

//------------------------------------------------------------------------------
const PLANS = [
  {
    planId: 'large',
    label: 'Large (20 documents)',
    price: 2000,
    currency: 'usd',
  },
  {
    planId: 'medium',
    label: 'Medium (15 documents)',
    price: 1500,
    currency: 'usd',
  },
  {
    planId: 'small',
    label: 'Small (10 documents)',
    price: 1000,
    currency: 'usd',
  },
  {
    planId: 'tiny',
    label: 'Tiny (5 documents)',
    price: 500,
    currency: 'usd',
  },
];
//------------------------------------------------------------------------------
fixtures.load = () => {
  PLANS.forEach(({ planId, label, price, currency }) => {
    const planExists = Plan.collection.findOne({ planId });
    if (!planExists) {
      Plan.collection.insert({ planId, label, price, currency });
    }
  });
};
//------------------------------------------------------------------------------

export default fixtures;
