import React from 'react';

const RepoListEntry = (props) => (
  <div>
    <h4>{props.repo.full_name}</h4>
    <p>Watchers: {props.repo.watchers_count}</p>
  </div>
);

export default RepoListEntry;
