const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('database.json')
const jwt = require('jsonwebtoken')
const cors = require('cors')
// server.use(middlewares)
/* server.use((req, res, next) => {
    if (isAuthorized(req)) { // add your authorization logic here
        next() // continue to JSON Server router
    } else {
        res.sendStatus(401)
    }
}) */
server.use(jsonServer.bodyParser)
server.use(cors())
server.use('/v1/auth', (req, res) => {
  const access_token = jwt.sign({
    iss: 'hackathon-swe',
    sub: '602183b35f4c84b513e3e380',
    sub_type: 'responsible',
    // scope: 'sc:ra co:ra',
    // scope: 'sc:r pa:r co:r',
  }, 'secret')
  res.json({ access_token })
})

server.use(jsonServer.rewriter({
  "/v1/alerts": "/alerts"
}))

server.use(router)
server.listen(3002, () => {
  console.log('JSON Server is running')
})