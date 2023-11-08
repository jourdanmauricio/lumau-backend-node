const express = require('express');

const router = express.Router();
const InstagramPostService = require('../services/instagramPost.service');
const instagramPostService = new InstagramPostService();

router.get('/', async (req, res, next) => {
  try {
    const url = req.headers['url'];
    const posts = await instagramPostService.find(url);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
