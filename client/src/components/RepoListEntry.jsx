import React from 'react';

const RepoListEntry = (props) => (
  <div>
    <h4>{props.repo.full_name}</h4>
  </div>
);

export default RepoListEntry;
