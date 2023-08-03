import React from 'react';
import { render, screen } from '@testing-library/react';
import PostList from './PostList';

window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};

describe('Post List', () => {
  test('render Post List correctly', async () => {
    render(<PostList />);
    const title = screen.getByText('Posts List');
    expect(title).toBeInTheDocument();
    const createNewPostBtn = screen.getByText('Create New Post');
    expect(createNewPostBtn).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });
});