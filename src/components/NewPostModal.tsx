import React from 'react';
import { Form, Input, Modal, message } from 'antd';
import PostDataService from '../services/postsService';
import INewPostRequest from '../types/newPost.type';


const NewPostModal: React.FC<{open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, reloadPosts: () => void}> = ({open, setOpen, reloadPosts}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const onClose = () => {
    setOpen(false);
  };

  const onFinish = () => {
    form
    .validateFields()
    .then((values) => {
      form.resetFields();
      const newPost = {
        userId: '11', // como nao temos login, padronizei para somente um user.
        title: values.title,
        body: values.body
      }
      createNewPost(newPost);
    })
    .catch((info) => {
      console.log('Validate Failed:', info);
    });
  }

  const createNewPost = async (newPost: INewPostRequest) => {
    const created = await PostDataService.create(newPost);
    if (created.data) {
      await reloadPosts();
      setOpen(false);
      messageApi.open({
        type: 'success',
        content: 'Your post was successfully created!',
      });
    } else {
      messageApi.open({
        type: 'error',
        content: 'Sorry! There was an error creating your post.',
      });
    }
  }

  return (
    <Modal title="Create New Post" onCancel={onClose} open={open} width={'70%'} onOk={onFinish}>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Post Title"
          name="title"
          rules={[{ required: true, message: 'Post title is required!' }]}
        >
          <Input />
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

export default NewPostModal;