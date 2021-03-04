const factoryGirl = require('factory-girl')
const adapter = new factoryGirl.SequelizeAdapter()
factory = factoryGirl.factory
factory.setAdapter(adapter)

const Booking = require('../../models').Booking

factory.define('booking', Booking, {
  bookingId: factory.sequence((n) => `booking${n}`),
  startDate: factory.sequence((n) => `2018-03-05T12:30:00.000+01:00`),
  endDate: factory.sequence((n) => `2018-03-05T18:30:00.000+01:00`),
  summary: factory.sequence((n) => `summary${n}`),
  status: factory.sequence((n) => `status${n}`),
})