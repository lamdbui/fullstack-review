const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL

  //https://api.github.com/users/lamdbui/repos
  // TODO: Should we do some input validation?
  const BASE_URL = 'https://api.github.com';
  const URL_REPOS = (username) ? `/users/${username}/repos` : '/user/repos';
  console.log('*** getting repo: ', `${BASE_URL}${URL_REPOS}`);
  let options = {
    url: `${BASE_URL}${URL_REPOS}`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  // make /user/repo request
  request.get(options, (error, response, body) => {
    if (error) {
      console.log('*** REQUEST ERROR ***');
      callback(error, null);
    }
    console.log('*** RESPONSE: ', response);
    callback(null, response);
  });
}

module.exports.getReposByUsername = getReposByUsername;
