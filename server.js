const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('database.json')
const jwt = require('jsonwebtoken')

// server.use(middlewares)
/* server.use((req, res, next) => {
    if (isAuthorized(req)) { // add your authorization logic here
        next() // continue to JSON Server router
    } else {
        res.sendStatus(401)
    }
}) */
server.use(jsonServer.bodyParser)
server.use('/v1/auth', (req, res) => {
  const access_token = jwt.sign({
    secretariat_city: 'Campina Grande',
    iss: 'vacinapb',
    sub: '602183b35f4c84b513e3e380',
    sub_type: 'admin',
    scope: 'sc:ra co:ra',
    // scope: 'sc:r pa:r co:r',
  }, 'secret')
  res.json({ access_token })
})

server.use(jsonServer.rewriter({
  "/v1/admins/:id": "/admins/:id",
  "/v1/secretaries/:id": "/secretaries/:id",
  "/v1/coordinators/:id": "/coordinators/:id",
  "/v1/users/:id/patients?limit=10": "/patients?_limit=10",
  "/v1/users/:id/statistics?type=priority": "/priority",
  "/v1/users/:id/statistics?type=comorbidities": "/comorbidities",
  "/v1/secretaries?limit=10": "/secretaries?_limit=10",
  "/v1/coordinators?limit=10": "/coordinators?_limit=10",
  "/v1/secretaries?page=2&limit=10": "/secretaries?_page=2&_limit=10",
  "/v1/coordinators?page=2&limit=10": "/coordinators?_page=2&_limit=10",
  "/v1/coordinators?limit=20": "/coordinators?_limit=20",
  "/v1/coordinators?limit=10&secretariat_city=:city": "/coordinators?_limit=10&secretariat_city=:city",
}))

server.use(router)
server.listen(3002, () => {
  console.log('JSON Server is running')
})