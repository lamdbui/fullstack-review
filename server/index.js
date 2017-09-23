const express = require('express');
const github = require('../helpers/github');
const database = require('../database');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('/repos POST');

  req.on('data', data => {
    // TODO: Should we do input validation here?
    let username = data.toString();
    console.log('*** DATA:', username);
    github.getReposByUsername(username, (error, result) => {
      if (error) {
        console.log('*** GET REPO ERROR:', error);
        // TODO: Relay some sort of failure back to the client
        res.end();
      } else {
        // console.log('*** GET REPO SUCCESS:', result);
        let githubFetchResult = JSON.parse(result.body);
        // console.log('*** GET REPO SUCCESS:', githubFetchResult);
        console.log('*** GET REPO SUCCESS:', githubFetchResult.length);
        //   id: Number,
        //   name: String,
        //   full_name: String,
        //   owner_id: Number
        // });
        //
        // let userSchema = mongoose.Schema({
        //   id: Number,
        //   name: String,
        //   avatar_url: String,
        //   html_url: String
        //
        // let repoArr = [];
        // githubFetchResult.forEach(result => {
        //   repoArr
        // });
        let repoModelArr = githubFetchResult.map(result => {
          return {
            id: result.id,
            name: result.name,
            full_name: result.full_name,
            owner_id: result.owner.id,
            owner_name: result.owner.login
          };
        });
        console.log('*** REPO MODELS: ', repoModelArr);
        database.save(repoModelArr, numSaved => {
          console.log('[server] SAVED RECORDS =', numSaved);
          res.end();
        });
        // res.end();
      }
    });
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log('/repos GET');
  res.end();
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
