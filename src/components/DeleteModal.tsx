import React from 'react';
import { Modal, message } from 'antd';
import PostDataService from '../services/postsService';
import IPost from '../types/post.type';

type DeleteModalType = {
  open: boolean,
  post: IPost,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  counter: number,
  setCounter: React.Dispatch<React.SetStateAction<number>>,
  reloadPosts: () => void,
}


const DeleteModal: React.FC<DeleteModalType> = ({open, setOpen, reloadPosts, post, setCounter, counter}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const onClose = () => {
    setOpen(false);
  };

  const onFinish = async () => {
    const deleted = await PostDataService.remove(post.id);
    if (deleted) {
      await reloadPosts();
      setCounter(counter + 1)
      setOpen(false);
      messageApi.open({
        type: 'success',
        content: 'Your post was successfully deleted!',
      });
    } else {
      messageApi.open({
        type: 'error',
        content: 'Sorry! There was an error deleting your post.',
      });
    }
  }

  return (
    <Modal title="Delete Post" onCancel={onClose} open={open} width={'70%'} onOk={onFinish} okText='Confirm'>
      {contextHolder}
      <span>Are you sure you want to delete this post?</span>
    </Modal>
  );
};

export default DeleteModal;