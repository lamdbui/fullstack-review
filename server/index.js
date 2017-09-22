const express = require('express');
const github = require('../helpers/github');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('/repos POST');

  req.on('data', data => {
    let username = data.toString();
    console.log('*** DATA:', username);
    // TODO: Should we do validation here?
    github.getReposByUsername(username, (error, result) => {
      if (error) {
        console.log('*** GET REPO ERROR:', error);
        res.end();
      } else {
        // console.log('*** GET REPO SUCCESS:', result);
        let githubFetchResult = result.body;
        console.log('*** GET REPO SUCCESS:', githubFetchResult);
        res.end();
      }
    });
  });

  // res.end();
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
