import React from 'react';
import { Form, Input, Modal, message } from 'antd';
import PostDataService from '../services/postsService';
import IPost from '../types/post.type';


const EditModal: React.FC<{open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, post: IPost, reloadPosts: () => void}> = ({open, setOpen, post, reloadPosts}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const onClose = () => {
    setOpen(false);
  };

  const onFinish = () => {
    form
    .validateFields()
    .then((values) => {
      const updatedPost = {
        userId: post.userId,
        id: post.userId,
        title: values.title,
        body: values.body
      }
      updatePost(updatedPost);
    })
    .catch((info) => {
      console.log('Validate Failed:', info);
    });
  }

  const updatePost = async (updatedPost: IPost) => {
    const updated = await PostDataService.update(updatedPost, post.id);
    if (updated.data) {
      await reloadPosts();
      setOpen(false);
      messageApi.open({
        type: 'success',
        content: 'Your post was successfully updated!',
      });
    } else {
      messageApi.open({
        type: 'error',
        content: 'Sorry! There was an error updating your post.',
      });
    }
  }

  return (
    <Modal title="Edit Post" onCancel={onClose} open={open} width={'70%'} onOk={onFinish}>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ title: post.title, body: post.body }}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Post Title"
          name="title"
          rules={[{ required: true, message: 'Post title is required!' }]}
        >
          <Input data-testid='edit-post-title' />
        </Form.Item>
        <Form.Item
          label="Body"
          name="body"
          rules={[{ required: true, message: 'Post body is required!' }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;