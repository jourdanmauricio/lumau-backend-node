const express = require('express');
const passport = require('passport');

const validatorHandler = require('./../middlewares/validator.handler');
const { checkAdminRole } = require('./../middlewares/auth.handler');
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require('./../schemas/user.schema');
const UserService = require('./../services/user.service');
const userService = new UserService();

const router = express.Router();

/**
 * @openapi
 * /v1/users:
 *  get:
 *    tags:
 *      - Users
 *    summary: "Get all users"
 *    description: "Obtain the list of users configured to use the backend. Only accessible by site administrator."
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/user"
 *      401:
 *        description: Error Unauthorized
 *    security:
 *      - bearerAuth: []
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  async (req, res) => {
    const users = await userService.find();
    res.json(users);
  },
);

/**
 * @openapi
 * /v1/users/profile:
 *  get:
 *    tags:
 *      - Users
 *    summary: "Get profile user"
 *    description: "Get user information."
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: "#/components/schemas/user"
 *      401:
 *        description: Error Unauthorized
 *    security:
 *      - bearerAuth: []
 */
router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { sub } = req.user;
      const user = await userService.findOne(sub);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * @openapi
 * /v1/users/{id}:
 *  get:
 *    tags:
 *      - Users
 *    summary: "Get user data."
 *    description: "Returns a single user. Only accessible by site administrator."
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of user to get info
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: "#/components/schemas/user"
 *      401:
 *        description: Error Unauthorized
 *      404:
 *        description: User not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                statuscode:
 *                  type: integer
 *                  example: 404
 *                error:
 *                  type: string
 *                  example: "Not Found"
 *                message:
 *                  type: string
 *                  example: "user not found"
 *    security:
 *      - bearerAuth: []
 */

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * @openapi
 * /v1/users:
 *  post:
 *    tags:
 *      - Users
 *    summary: "Create a user."
 *    description: "Returns a single user. Only accessible by site administrator."
 *    requestBody:
 *      description: Create a user.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              attributes:
 *                type: 'array'
 *                example: ['contact', 'subscriber', 'posts']
 *              email:
 *                type: 'string'
 *                example: 'admin@labranzas.com.ar'
 *              password:
 *                type: 'string'
 *                example: '12345678'
 *              name:
 *                type: 'string'
 *                example: 'Labranzas'
 *              url:
 *                type: 'string'
 *                example: 'https://labranzas.com.ar'
 *              phone:
 *                type: 'string'
 *                example: '1158046525'
 *              dni:
 *                type: 'string'
 *                example: ''
 *              deploy:
 *                type: 'string'
 *                example: 'Netlify'
 *              role:
 *                type: 'string'
 *                example: 'user'
 *      required: true
 *    responses:
 *      201:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: "#/components/schemas/user"
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                statuscode:
 *                  type: integer
 *                  example: 400
 *                errors:
 *                  type: string
 *                  example: Bad Request
 *                message:
 *                  type: string
 *                  example: name is required
 *      401:
 *        description: Error Unauthorized
 *      409:
 *        description: Conflict
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                statuscode:
 *                  type: integer
 *                  example: 409
 *                errors:
 *                  type: array
 *                  example: [{}]
 *                message:
 *                  type: string
 *                  example: "SequelizeUniqueConstraintError"
 *    security:
 *      - bearerAuth: []
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = await userService.create(body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * @openapi
 * /v1/users/{id}:
 *  put:
 *    tags:
 *      - Users
 *    summary: "Update a user."
 *    description: "Returns the updated user."
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of user to update
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *    requestBody:
 *      description: Update a user.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              attributes:
 *                type: 'array'
 *                example: ['contact', 'subscriber', 'posts']
 *              email:
 *                type: 'string'
 *                example: 'admin@labranzas.com.ar'
 *              password:
 *                type: 'string'
 *                example: '12345678'
 *              name:
 *                type: 'string'
 *                example: 'Labranzas'
 *              url:
 *                type: 'string'
 *                example: 'https://labranzas.com.ar'
 *              phone:
 *                type: 'string'
 *                example: '1158046525'
 *              dni:
 *                type: 'string'
 *                example: ''
 *              deploy:
 *                type: 'string'
 *                example: 'Netlify'
 *      required: true
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: "#/components/schemas/user"
 *      401:
 *        description: Error Unauthorized
 *    security:
 *      - bearerAuth: []
 */
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  // checkAdminRole,
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      let id;
      const jwtUser = req.user;
      if (jwtUser.role === 'admin') {
        id = req.params.id;
      } else {
        id = jwtUser.sub;
      }
      // const { id } = req.params;
      const body = req.body;
      const user = await userService.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * @openapi
 * /v1/users/{id}:
 *  delete:
 *    tags:
 *      - Users
 *    summary: "Delete a user"
 *    description: "Delete a user. Only accessible by site administrator."
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of user to get info
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  example: "2"
 *      401:
 *        description: Error Unauthorized
 *      404:
 *        description: User not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                statuscode:
 *                  type: integer
 *                  example: 404
 *                error:
 *                  type: string
 *                  example: "Not Found"
 *                message:
 *                  type: string
 *                  example: "user not found"
 *    security:
 *      - bearerAuth: []
 */

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      // const { role } = req.user;
      const { id } = req.params;
      const rta = await userService.delete(id);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  },
);

// router.put(
//   '/change-password/:id',
//   passport.authenticate('jwt', { session: false }),
//   validatorHandler(updatePassUserSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const { id, newPassword } = req.body;

//       const rta = await service.updatePass(id, newPassword);
//       res.status(200).json(rta);
//     } catch (error) {
//       next(error);
//     }
//   },
// );

module.exports = router;
