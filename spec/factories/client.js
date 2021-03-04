const factoryGirl = require('factory-girl')
const adapter = new factoryGirl.SequelizeAdapter()
factory = factoryGirl.factory
factory.setAdapter(adapter)

const User = require('../../models').User

factory.define('user', User, {
  admin: factory.sequence((n) => `false`),
  clientDashboard: factory.sequence((n) => `true`),
  email: factory.sequence((n) => `user${n}@client${n}.com`),
  employeeDashboard: factory.sequence((n) => `false`),
  firstName: factory.sequence((n) => `firstName${n}`),
  lastName: factory.sequence((n) => `lastName${n}`),
  userType: factory.sequence((n) => `client`),
})