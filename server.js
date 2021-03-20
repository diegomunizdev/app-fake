const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('database.json')
const jwt = require('jsonwebtoken')
const morgan = require('morgan')
const cors = require('cors')

// server.use(middlewares)
/* server.use((req, res, next) => {
    if (isAuthorized(req)) { // add your authorization logic here
        next() // continue to JSON Server router
    } else {
        res.sendStatus(401)
    }
}) */
server.use(morgan(':method => :url'))
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PATCH,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.setHeader("Access-Control-Expose-Headers", "x-total-count")
  next()
})
server.use(cors())
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
  "/v1/notifications": "/notifications"
}))

server.use(router)

server.listen(3002, () => {
  console.log('JSON Server is running')
})