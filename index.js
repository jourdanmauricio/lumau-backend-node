const express = require('express');
const passport = require('passport');
const cors = require('cors');
const routerApi = require('./routes');
const { checkApiKey } = require('./middlewares/auth.handler');
const { swaggerDocs: v1SwaggerDocs } = require('./routes/swagger');
const { config } = require('./config/config');

const {
  logErrors,
  errorHandler,
  boomHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/v1', checkApiKey, (req, res) => {
  res.send('Hola mi server en express');
});

require('./utils/auth');

app.use(passport.initialize());
routerApi(app);

// const whitelist = ['http://localhost:8080', 'https://myapp.com'];
// const options = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Origin Unauthorize', origin));
//     }
//   },
// };
// app.use(cors(options));
app.use(cors());

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomHandler);
app.use(errorHandler);

app.listen(port, () => {
  const url = `${config.backendDomain}${
    config.env === 'dev' ? `:${port}` : ''
  }`;

  // eslint-disable-next-line no-console
  console.log(`Starting at ${url}/v1`);
  // console.log('Starting at http://localhost:' + port + '/v1');
  v1SwaggerDocs(app);
});
