// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');
const { config } = require('./../config/config');

const port = process.env.PORT || 3000;
const url = `${config.backendDomain}${config.env === 'dev' ? `:${port}` : ''}`;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Lumau Doc API',
      version: '1.0.0',
    },
    servers: [{ url }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
        },
      },
      schemas: {
        user: {
          type: 'object',
          required: [
            'id',
            'email',
            'name',
            'url',
            'deploy',
            'role',
            'createdAt',
            'updatedAt',
          ],
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            attributes: {
              type: 'array',
              example: ['contact', 'subscriber', 'posts'],
            },
            email: {
              type: 'string',
              example: 'admin@blackwind.com',
            },
            name: {
              type: 'string',
              example: 'Blackwind',
            },
            url: {
              type: 'string',
              example: 'https://blackwind.com.ar',
            },
            phone: {
              type: 'string',
              example: '1158046525',
            },
            dni: {
              type: 'string',
              example: '',
            },
            deploy: {
              type: 'string',
              example: 'Netlify',
            },
            role: {
              type: 'string',
              example: 'user',
            },
            createdAt: {
              type: 'string',
              example: '2023-08-21 15:08:14',
            },
            updatedAt: {
              type: 'string',
              example: '2023-08-21 15:08:14',
            },
          },
        },
        login: {
          type: 'object',
          required: ['url', 'password'],
          properties: {
            url: {
              type: 'string',
              example: 'blackwind.com.ar',
            },
            password: {
              type: 'string',
              example: '********',
            },
          },
        },
      },
    },
  },
  apis: [
    `${path.join(__dirname, './auth.router.js')}`,
    `${path.join(__dirname, './users.router.js')}`,
  ],
};

// Docs en json format
const swaggerSpec = swaggerJsDoc(options);

// Setup our docs
const swaggerDocs = (app) => {
  app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/v1/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  const url = `${config.backendDomain}${
    config.env === 'dev' ? `:${port}` : ''
  }`;

  // eslint-disable-next-line no-console
  console.log(`Version 1 Docs are available at ${url}/v1/docs`);
  // console.log(
  //   `Version 1 Docs are available at http://localhost:${port}/v1/docs`,
  // );
};

module.exports = { swaggerDocs };
