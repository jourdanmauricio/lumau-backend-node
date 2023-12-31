require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  adminFrontEnd: process.env.ADMIN_FRONTEND,
  backendDomain: process.env.BACKEND_DOMAIN,
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  databaseUrl: process.env.DATABASE_URL,

  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,

  adminPass: process.env.ADMIN_PASS,
  adminEmail: process.env.ADMIN_EMAIL,
  adminName: process.env.ADMIN_NAME,
  adminUrl: process.env.ADMIN_URL,
  adminPhone: process.env.ADMIN_PHONE,
  adminDni: process.env.ADMIN_DNI,
  adminDeploy: process.env.ADMIN_DEPLOY,
  adminRole: process.env.ADMIN_ROLE,
  adminAttributes: process.env.ADMIN_ATTRIBUTES,
  username: process.env.ADMIN_USERNAME,

  adminGithubToken: process.env.ADMIN_GITHUB_TOKEN,
  adminGithub: process.env.ADMIN_GITHUB,
  githubUrl: process.env.GITHUB_URL,

  // mailerEmail: process.env.MAILER_EMAIL,
  // mailerPassword: process.env.MAILER_PASSWORD,

  emailSend: process.env.EMAIL_SEND,
  emailPort: process.env.EMAIL_PORT,
  emailSecure: process.env.EMAIL_SECURE,
  emailSendPass: process.env.EMAIL_SEND_PASS,
  emailTo: process.env.EMAIL_TO,

  secretFaceDev: process.env.SECRET_FACE_DEV,
  clientFaceDev: process.env.CLIENT_FACE_DEV,
  redirectUriFaceDev: process.env.REDIRECT_URI_FACE_DEV,
  urlChangeTokenFaceDev: process.env.URL_CHANGE_TOKEN_FACE_DEV,
};

module.exports = { config };
