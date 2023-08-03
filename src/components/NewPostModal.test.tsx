import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import NewPostModal from './NewPostModal';

window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};

describe('New Post Modal', () => {
  const setOpen = jest.fn();
  const reloadPosts = jest.fn();

  test('render and close New Post Modal correctly', async () => {
    render(<NewPostModal open={true} setOpen={setOpen} reloadPosts={reloadPosts} />);
    const title = screen.getByText('Create New Post');
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

  test('should not create new post and call reload post with no body or post title', async () => {
    render(<NewPostModal open={true} setOpen={setOpen} reloadPosts={reloadPosts} />);
    const okBtn = screen.getByText('OK');
    expect(okBtn).toBeInTheDocument();
    await waitFor(async () => {
        await fireEvent(
          okBtn,
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        )
    })
    expect(reloadPosts).not.toHaveBeenCalled();
    expect(setOpen).not.toHaveBeenCalled();
  });
});