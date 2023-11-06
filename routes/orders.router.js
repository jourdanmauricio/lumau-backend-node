const express = require('express');
const passport = require('passport');

const multer = require('multer');

const storage = multer.diskStorage({
  // destination: './public/data/uploads/',
  destination: function (req, file, cb) {
    // console.log('req', req.body.dni);
    // const path = `./public/data/uploads/${req.body.dni}/`;
    const path = './public/data/uploads/';
    // cb(null, `./public/data/uploads/${req.body.dni}/`);
    cb(null, path);
  },
  filename: (req, file, cb) => {
    // console.log('UPLOAD', file.originalname);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
// const upload = multer({ dest: './public/data/uploads/' });

// const uploadFiles = require('../middlewares/multer');

const { checkAuthRoute } = require('./../middlewares/auth.handler');

const UserService = require('../services/user.service');
const userService = new UserService();

const validatorHandler = require('../middlewares/validator.handler');
const {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
} = require('../schemas/order.schema');

const router = express.Router();
const OrderService = require('../services/order.service');
const orderService = new OrderService();

router.get('/', async (req, res, next) => {
  try {
    const url = req.headers['url'];

    const orders = await orderService.find(url);
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

router.post('/prints', upload.array('input-file'), async (req, res, next) => {
  try {
    const files = req.files;
    const body = req.body;

    const filesDetail = files.map((file, index) => ({
      id: index + 1,
      name: file.originalname,
      type: file.mimetype,
      size: file.size,
    }));

    const attachments = files.map((file) => ({
      name: file.originalname,
      path: file.path,
      //contentDisposition: 'inline',
    }));

    const obj = {
      id: new Date().valueOf(),
      buyer: [
        {
          name: body.name,
          dni: body.dni,
          email: body.email,
          phone: body.phone,
        },
      ],
      items: filesDetail,
      delivery: false,
      observation: body.observation,
      amount: 1,
      type: 'print',
      status: 'active',
      payment: false,
    };

    const { url } = req.headers;
    const user = await userService.findByUrl(url);
    obj.userId = user.id;
    obj.email = user.email;
    obj.url = url;

    const newOrder = await orderService.createPrint(obj, attachments);

    // res.status(201).json({ Ok: 'ok' });
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { url } = req.headers;
      const user = await userService.findByUrl(url);
      body.userId = user.id;
      body.email = user.email;
      body.url = url;
      body.type = 'products';

      const newOrder = await orderService.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  checkAuthRoute('Pedidos'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const order = await orderService.update(id, body);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOrderSchema, 'params'),
  checkAuthRoute('Pedidos'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await orderService.delete(id);
      res.status(200).json(rta);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
