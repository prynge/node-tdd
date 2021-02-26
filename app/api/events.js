module.exports = (app, api) => {
  app.get('/events', async (req, res) => {
    res.status(200).send(api)
  })
}