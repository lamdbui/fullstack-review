const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  name: String,
  full_name: String,
  stargazers_count: Number,
  watchers_count: Number,
  owner_id: Number,
  owner_name: String
});

let userSchema = mongoose.Schema({
  id: Number,
  name: String,
  avatar_url: String,
  html_url: String
});

let Repo = mongoose.model('Repo', repoSchema);
let User = mongoose.model('User', userSchema);

let get = (options, callback) => {
  // get items back from the database
  // generate a search query then execute it, then handle the returning promise
  Repo.find().sort({watchers_count: -1}).exec()
    .then(resolve => {
      console.log('### sorted: ', resolve.length);
      callback(resolve);
    })
    .catch(reject => {
      console.log('### sorted REJECT: ', reject.length);
      // return empty array on error
      callback([]);
    });
};

let save = (repoArr, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  let saveAttemptCount = repoArr.length;
  let saveCount = 0;
  repoArr.forEach(repo => {
    // only do a save, if it's not already there
    Repo.find({id: repo.id}, (error, docs) => {
      if (error) {
        console.log('*** FOUND ERROR: ', error)
      } else {
        // no duplicates found, let's save
        if (docs.length === 0) {
          console.log('*** NO DUPLICATES FOUND - saving repo_id: ', repo.id);
          // save it!
          // TODO: Move this functionality into a Repo method
          let repoModel = new Repo(repo);
          console.log('repoObj:', repoModel);
          repoModel.save((error, resultObj, numAffected) => {
            if (error) {
              console.log('[database:error]', error);
              // callback(error, 0);
            } else {
              // console.log(`[database:resultObj : numAffected] ${resultObj} : ${numAffected}`);
              saveCount++;
            }
            saveAttemptCount--;
            // return back our result after all save attempts were completed
            if (saveAttemptCount === 0) {
              callback(saveCount);
            }
          });
        } else {
          console.log('*** FOUND A DUPLICATE - do not insert: ', docs.length);
        }
      }
    });
  });
}

module.exports.get = get;
module.exports.save = save;
module.exports.Repo = Repo;
module.exports.User = User;
