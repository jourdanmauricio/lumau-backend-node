const { User, UserSchema } = require('./user.model');
const { Subscriber, SubscriberSchema } = require('./subscriber.model');
const { Contact, ContactSchema } = require('./contact.model');
const { Note, NoteSchema } = require('./note.model');
const { Feature, FeatureSchema } = require('./feature.model');
const { Loan, LoanSchema } = require('./loan.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Subscriber.init(SubscriberSchema, Subscriber.config(sequelize));
  Contact.init(ContactSchema, Contact.config(sequelize));
  Note.init(NoteSchema, Note.config(sequelize));
  Feature.init(FeatureSchema, Feature.config(sequelize));
  Loan.init(LoanSchema, Loan.config(sequelize));

  User.associate(sequelize.models);
  Subscriber.associate(sequelize.models);
  Contact.associate(sequelize.models);
  Note.associate(sequelize.models);
  Feature.associate(sequelize.models);
  Loan.associate(sequelize.models);
}
module.exports = setupModels;
