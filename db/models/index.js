const { User, UserSchema } = require('./user.model');
const { Subscriber, SubscriberSchema } = require('./subscriber.model');
const { Contact, ContactSchema } = require('./contact.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Subscriber.init(SubscriberSchema, Subscriber.config(sequelize));
  Contact.init(ContactSchema, Contact.config(sequelize));

  User.associate(sequelize.models);
  Subscriber.associate(sequelize.models);
  Contact.associate(sequelize.models);
}
module.exports = setupModels;
