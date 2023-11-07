const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const AuthService = require('./../services/auth.service');
const authService = new AuthService();

const { config } = require('./../config/config');
const router = express.Router();

/**
 * @openapi
 * /v1/auth/login:
 *  post:
 *    tags:
 *      - Auth
 *    summary: "User login"
 *    description: "Login to get the token."
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/login"
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  type: object
 *                  $ref: "#/components/schemas/user"
 *                token:
 *                  type: string
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5MzE0MDMxMH0.54QHzgn5nCB9N_ZPVpYqNPMXSj7HtiEpWTGNLSi3kfE
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                statuscode:
 *                  type: integer
 *                  example: 401
 *                error:
 *                  type: string
 *                  example: "Unauthorized"
 *                message:
 *                  type: string
 *                  example: "Unauthorized"
 */
router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
        role: user.role,
        attributes: user.attributes,
        cloudName: user.cloudName,
        clodFolder: user.clodFolder,
        cloudApiKey: user.cloudApiKey,
        cloudPreset: user.cloudPreset,
      };
      const token = jwt.sign(payload, config.jwtSecret);
      res.json({
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.post('/recovery', async (req, res, next) => {
  try {
    const { username } = req.body;
    const rta = await authService.sendRecovery(username);
    res.status(200).json(rta);
  } catch (error) {
    next(error);
  }
});

router.post('/change-password', async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const rta = await authService.changePassword(token, password);
    res.status(200).json(rta);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/regenerate-page',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { repo } = req.body;
      await authService.regeneratePage(repo);

      res.status(200).json({ status: 200, message: 'OK' });
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/auth-instagram',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { sub } = req.user;
      const body = req.body;
      const rta = await authService.changeAuthInstagram(sub, body);

      res.status(200).json(rta);
    } catch (error) {
      next(error);
    }
  },
);
module.exports = router;
