const { User, UserSchema } = require('./user.model');
const { Subscriber, SubscriberSchema } = require('./subscriber.model');
const { Contact, ContactSchema } = require('./contact.model');
const { Note, NoteSchema } = require('./note.model');
const { Feature, FeatureSchema } = require('./feature.model');
const { Loan, LoanSchema } = require('./loan.model');
const { Service, ServiceSchema } = require('./service.model');
const { Image, ImageSchema } = require('./image.model');
const { Section, SectionSchema } = require('./section.model');
const { Office, OfficeSchema } = require('./office.model');
const { Network, NetworkSchema } = require('./network.model');
const { Post, PostSchema } = require('./post.model');
const { Lesson, LessonSchema } = require('./lesson.model');
const { ProdLib, ProdLibSchema } = require('./prodLib.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Subscriber.init(SubscriberSchema, Subscriber.config(sequelize));
  Contact.init(ContactSchema, Contact.config(sequelize));
  Note.init(NoteSchema, Note.config(sequelize));
  Feature.init(FeatureSchema, Feature.config(sequelize));
  Loan.init(LoanSchema, Loan.config(sequelize));
  Service.init(ServiceSchema, Service.config(sequelize));
  Image.init(ImageSchema, Image.config(sequelize));
  Section.init(SectionSchema, Section.config(sequelize));
  Office.init(OfficeSchema, Office.config(sequelize));
  Network.init(NetworkSchema, Network.config(sequelize));
  Post.init(PostSchema, Post.config(sequelize));
  Lesson.init(LessonSchema, Lesson.config(sequelize));
  ProdLib.init(ProdLibSchema, ProdLib.config(sequelize));

  User.associate(sequelize.models);
  Subscriber.associate(sequelize.models);
  Contact.associate(sequelize.models);
  Note.associate(sequelize.models);
  Feature.associate(sequelize.models);
  Loan.associate(sequelize.models);
  Service.associate(sequelize.models);
  Image.associate(sequelize.models);
  Office.associate(sequelize.models);
  Network.associate(sequelize.models);
  Post.associate(sequelize.models);
  Lesson.associate(sequelize.models);
  ProdLib.associate(sequelize.models);
}
module.exports = setupModels;
