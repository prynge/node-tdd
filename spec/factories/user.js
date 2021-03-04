const factoryGirl = require('factory-girl')
const adapter = new factoryGirl.SequelizeAdapter()
factory = factoryGirl.factory
factory.setAdapter(adapter)

const User = require('../../models').User

factory.define('user', User, {
  admin: factory.sequence((n) => `company${n}`),
  clientDashboard: factory.sequence((n) => `company${n}`),
  email: factory.sequence((n) => `company${n}`),
  employeeDashboard: factory.sequence((n) => `company${n}`),
  firstName: factory.sequence((n) => `company${n}`),
  hourlyRate: factory.sequence((n) => `company${n}`),
  lastName: factory.sequence((n) => `company${n}`),
  userType: factory.sequence((n) => `company${n}`),
})