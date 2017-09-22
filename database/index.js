const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/fetcher');

// TODO: Do we need this?
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('*** MONGOOSE CONNECTED ***');
// });

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  // [user]
  // - id (unique, primary key)
  // - name
  // - avatar_url
  // - html_url
  //
  // [repo]
  // - id (unique, primary key)
  // - name
  // - full_name
  // - owner_id (foreign key)

  id: Number,
  name: String,
  full_name: String,
  owner_id: Number
});

let userSchema = mongoose.Schema({
  id: Number,
  name: String,
  avatar_url: String,
  html_url: String
});

let Repo = mongoose.model('Repo', repoSchema);
let User = mongoose.model('User', userSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;
