const factoryGirl = require('factory-girl')
const adapter = new factoryGirl.SequelizeAdapter()
factory = factoryGirl.factory
factory.setAdapter(adapter)

const Company = require('../../models').Company

factory.define('company', Company, {
  id: 1,
  companyId: 1,
  companyName: `Gembani`,
})

factory.define('company', Company, {
  id: 2,
  companyId: 2,
  companyName: `SuperCoolClient`,
})

factory.define('company', Company, {
  id: 3,
  companyId: 3,
  companyName: `ClientThatPaysLate`,
})

