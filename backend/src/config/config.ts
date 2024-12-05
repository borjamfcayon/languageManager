export default {
  jwtSecret: process.env.JWT_SECRET || "ConozcoTuSecretoLanguagesApp",
  DB: {
    URI: process.env.MONGODB_URI || "mongodb://localhost/language-app",
    USER: process.env.MONGODB_USER,
    PASSWORD: process.env.MONGODB_PASSWORD,
  },
};
