import React from 'react';

const RepoListEntry = (props) => (
  <div>
    <a href={props.repo.html_url}><h4>{props.repo.full_name}</h4></a>
    <p>Watchers: {props.repo.watchers_count}</p>
  </div>
);

export default RepoListEntry;
