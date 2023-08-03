import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import EditModal from './EditModal';

window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};

describe('Edit Modal', () => {
  const setOpen = jest.fn();
  const reloadPosts = jest.fn();
  const mockPost = {
    userId: '1',
    id: '10',
    title: 'test title',
    body: 'test body',
  }

  test('render and close Edit Modal correctly', async () => {
    render(<EditModal open={true} setOpen={setOpen} reloadPosts={reloadPosts} post={mockPost} />);
    const title = screen.getByText('Edit Post');
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

  test('should load editable info correctly', async () => {
    render(<EditModal open={true} setOpen={setOpen} reloadPosts={reloadPosts} post={mockPost} />);
    const editTitle = screen.getByTestId('edit-post-title');
    expect(editTitle).toHaveValue('test title');
    const editBody = screen.getByText('test body');
    expect(editBody).toBeInTheDocument();
  });
});