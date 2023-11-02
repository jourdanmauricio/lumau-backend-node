const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const cloudinary = require('cloudinary');

const UserService = require('../services/user.service');
const userService = new UserService();

class ImageService {
  async create(data) {
    const newImage = await models.Image.create(data);
    return newImage;
  }

  async find(url = '') {
    const user = await userService.findByUrl(url);

    let position = user.dataValues.attributes.search(/Imágenes/);
    if (position === -1) {
      throw boom.unauthorized('web not found');
    }
    const images = await models.Image.findAll({ where: { userId: user.id } });
    return images;
  }

  async findOne(id) {
    const image = await models.Image.findByPk(id);
    if (!image) {
      throw boom.notFound('loan not found');
    }
    return image;
  }

  async update(id, changes) {
    const image = await this.findOne(id);
    const rta = await image.update(changes);
    return rta;
  }

  async delete(id, userId) {
    const user = await userService.findOne(userId);

    cloudinary.config({
      cloud_name: user.cloudName,
      api_key: user.cloudApiKey,
      api_secret: user.cloudSecret,
    });

    cloudinary.v2.uploader.destroy('libreriaalfaweb/' + id, (error, result) => {
      if (error) {
        console.log('ERRRORRR', error);
        //        throw 'Error Cloudinary';
      } else {
        console.log('Imagen eliminada exitosamente:', result);
      }
    });
    return 'libreriaalfaweb/' + id;

    // cloudinary.v2.uploader
    //   .destroy('libreriaalfaweb/' + id)
    //   .then((result) => console.log(result));
  }
}

module.exports = ImageService;
