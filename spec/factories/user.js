const factoryGirl = require('factory-girl')
const adapter = new factoryGirl.SequelizeAdapter()
factory = factoryGirl.factory
factory.setAdapter(adapter)

const User = require('../../models').User

factory.define('user', User, {
  email: factory.sequence((n) => `user${n}@mail`),
  firstName: factory.sequence((n) => `firstName${n}`),
  hourlyRate: factory.sequence((n) => `hourlyRate${n}`),
  lastName: factory.sequence((n) => `lastName${n}`),
})