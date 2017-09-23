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
        let githubFetchResult = JSON.parse(result.body);
        console.log('*** GET REPO SUCCESS:', githubFetchResult);
        let repoModelArr = githubFetchResult.map(result => {
          return {
            id: result.id,
            name: result.name,
            full_name: result.full_name,
            stargazers_count: result.stargazers_count,
            watchers_count: result.watchers_count,
            owner_id: result.owner.id,
            owner_name: result.owner.login
          };
        });
        console.log('*** REPO MODELS: ', repoModelArr);
        database.save(repoModelArr, numSaved => {
          console.log('[server] SAVED RECORDS =', numSaved);
          res.end();
        });
      }
    });
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log('/repos GET');
  database.get({}, results => {
    console.log('/repos GET RESULTS: ', results.length);
    res.statusCode = 200;
    // TODO: Maybe format the data instead of sending rows
    res.send(results);
  });
  // res.end();
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
