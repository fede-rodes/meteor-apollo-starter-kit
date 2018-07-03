
let usersQueryResult = [];

module.exports = {
  Meteor: {
    settings: {
      googleAuth: {
        clientId: '1', 
        clientSecret: '1', 
        redirectUris: []
      },
        public: {
          config: {
            supportEmail: 'arcomito@gmail.com'
          }
        },
        private: {
          stripe: {
            stripeKey: '111'
          }
        }
      },
      bindEnvironment: jest.fn(),
      methods: jest.fn(),
      call: jest.fn(),
      absoluteUrl: () => 'www.google.com',
      users: {
          findOne: jest.fn().mockImplementation(() => usersQueryResult),
          find: jest.fn().mockImplementation(() => ({
              fetch: jest.fn().mockReturnValue(usersQueryResult),
              count: jest.fn(),
          })),
    },
  }
};

// export const Meteor = {

// };

