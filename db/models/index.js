const { User, UserSchema } = require('./user.model');
const { Subscriber, SubscriberSchema } = require('./subscriber.model');
const { Contact, ContactSchema } = require('./contact.model');
const { Note, NoteSchema } = require('./note.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Subscriber.init(SubscriberSchema, Subscriber.config(sequelize));
  Contact.init(ContactSchema, Contact.config(sequelize));
  Note.init(NoteSchema, Note.config(sequelize));

  User.associate(sequelize.models);
  Subscriber.associate(sequelize.models);
  Contact.associate(sequelize.models);
  Note.associate(sequelize.models);
}
module.exports = setupModels;
