const cleanDb = async (db) => {
  await db.Author.destroy({truncate: {cascade: true}});
  await db.Post.destroy({truncate: {cascade: true}});
  await db.Account.destroy({truncate: {cascade: true}});
  await db.Booking.destroy({truncate: {cascade: true}});
  await db.Companies.destroy({truncate: {cascade: true}});
  await db.Users.destroy({truncate: {cascade: true}});
}
module.exports = cleanDb
