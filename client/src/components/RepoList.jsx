import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = (props) => (
  <div>
    {props.repos.map((repo, k) => <RepoListEntry key={k} repo={repo} />)}
    There are {props.repos.length} repos.
  </div>
)

export default RepoList;
