let usersQueryResult = [];

export function __setUsersQueryResult(result) {
  usersQueryResult = result;
}

export const Slingshot = {

}

export const Mongo = {
  Collection: jest.fn().mockImplementation(() => ({
    _ensureIndex: (jest.fn()),
    allow: (jest.fn()),
    deny: (jest.fn()),
    attachSchema: (jest.fn()),
    findOne: (jest.fn()),
    update: (jest.fn()),
  })),
};
