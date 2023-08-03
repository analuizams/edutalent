import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import DeleteModal from './DeleteModal';

window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};

describe('Delete Modal', () => {
  const setOpen = jest.fn();
  const reloadPosts = jest.fn();
  const mockPost = {
    userId: '1',
    id: '10',
    title: 'test title',
    body: 'test body',
  }
  const counter = 0;
  const setCounter = jest.fn();

  test('render and close Delete Modal correctly', async () => {
    render(
      <DeleteModal open={true} setOpen={setOpen} reloadPosts={reloadPosts} post={mockPost} counter={counter} setCounter={setCounter} />
      );
    const title = screen.getByText('Delete Post');
    expect(title).toBeInTheDocument();
    const closeBtn = screen.getByLabelText('Close');
    expect(closeBtn).toBeInTheDocument();
    await fireEvent(
      closeBtn,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )
    expect(setOpen).toHaveBeenCalled();
  });
});