const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(link) {
        return /https?:\/\/(www\.)?[a-zA-Z0-9-@#$%:._=+~&*\\]{1,333}\.[0-9A-Za-z]{1,4}\b([a-zA-Z0-9-@#$%:._=//()+~&*\\]*)/.test(link);
      },
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return /https?:\/\/(www\.)?[a-zA-Z0-9-@#$%:._=+~&*\\]{1,333}\.[0-9A-Za-z]{1,4}\b([a-zA-Z0-9-@#$%:._=//()+~&*\\]*)/.test(link);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);