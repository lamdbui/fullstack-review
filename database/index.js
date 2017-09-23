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
  // TODO: remove this later and reference the User table
  // - owner_name

  id: Number,
  name: String,
  full_name: String,
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

let save = (repoArr, callback) => {

  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  let saveAttemptCount = repoArr.length;
  let saveCount = 0;
  repoArr.forEach(repo => {
    // only do a save, if it's not already there
    Repo.find({id: 12321321321321312}, (error, docs) => {
      if (error) {
        console.log('*** FOUND ERROR: ', error)
      } else {
        // no duplicates found, let's save
        if (docs.length === 0) {
          // save it!
          // TODO: Move this functionality into a Repo method
          let repoModel = new Repo(repo);
          console.log('repoObj:', repoModel);
          repoModel.save((error, resultObj, numAffected) => {
            if (error) {
              console.log('[database:error]', error);
              // callback(error, 0);
            } else {
              console.log(`[database:resultObj : numAffected] ${resultObj} : ${numAffected}`);
              saveCount++;
            }
            saveAttemptCount--;
            // return back our result after all save attempts were completed
            if (saveAttemptCount === 0) {
              callback(saveCount);
            }
          });
        } else {
          console.log('*** FOUND A DUPLICATE - do not insert: ', docs);
        }
      }
    });
    // // save it!
    // let repoModel = new Repo(repo);
    // console.log('repoObj:', repoModel);
    // repoModel.save((error, resultObj, numAffected) => {
    //   if (error) {
    //     console.log('[database:error]', error);
    //     // callback(error, 0);
    //   } else {
    //     console.log(`[database:resultObj : numAffected] ${resultObj} : ${numAffected}`);
    //     // TODO: return the number of rows changed
    //     // callback(null, numAffected);
    //     saveCount++;
    //   }
    //   saveAttemptCount--;
    //   if (saveAttemptCount === 0) {
    //     callback(saveCount);
    //   }
    // });
  });
}

module.exports.save = save;
module.exports.Repo = Repo;
module.exports.User = User;
