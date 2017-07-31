import React from 'react';
import ReactDOM from 'react-dom';
import RepoList from './RepoList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RepoList />, div);
});
