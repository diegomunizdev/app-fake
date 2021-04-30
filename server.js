const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('database.json');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const cors = require('cors');

// server.use(middlewares)
/* server.use((req, res, next) => {
    if (isAuthorized(req)) { // add your authorization logic here
        next() // continue to JSON Server router
    } else {
        res.sendStatus(401)
    }
}) */

server.use(morgan(':method => :url'));
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PATCH,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.setHeader("Access-Control-Expose-Headers", "x-total-count")
  next();
});

server.use(cors());
server.use(jsonServer.bodyParser);
server.use('/v1/auth', (req, res) => {
  const access_token = jwt.sign({
    iss: 'teste',
    sub: '5a62be07de34500146d9c540',
    sub_type: 'responsible',
    // scope: 'sc:ra co:ra',
    // scope: 'sc:r pa:r co:r',
  }, 'secret');
  res.json({ access_token });
});

server.use(jsonServer.rewriter({
  // Account service
  // Routes for admins
  "/v1/admins": "/admins",
  "/v1/admins?page=:page&limit=:limit": "/admins?_page=:page&_limit=:limit",
  "/v1/admins/:id": "/admins/:id",
  // Routes for managers
  "/v1/managers": "/managers",
  "/v1/managers?page=:page&limit=:limit": "/managers?_page=:page&_limit=:limit",
  "/v1/managers/:id": "/managers/:id",
  // Routes for requesters
  "/v1/requesters": "/requesters",
  "/v1/requesters?page=:page&limit=:limit": "/requesters?_page=:page&_limit=:limit",
  "/v1/requesters/:id": "/requesters/:id",
  // Routes for regulators
  "/v1/regulators": "/regulators",
  "/v1/regulators?page=:page&limit=:limit": "/regulators?_page=:page&_limit=:limit",
  "/v1/regulators/:id": "/regulators/:id",
  // Routes for operators
  "/v1/operators": "/operators",
  "/v1/operators?page=:page&limit=:limit": "/operators?_page=:page&_limit=:limit",
  "/v1/operators/:id": "/operators/:id",
  // Remove user - change the user type on the route
  "/v1/users/:id": "/admins/:id"
}));

server.use(router);

server.listen(3002, () => {
  console.log('JSON Server is running');
});