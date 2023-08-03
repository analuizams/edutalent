import React, { useState, useEffect } from 'react';
import { Button, Space, Table, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import PostDataService from '../services/postsService';
import IPost from '../types/post.type';
import NewPostModal from './NewPostModal';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

const PostList: React.FC = () => {
  const [error, setError] = useState<any>(null);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<IPost|null>(null);
  const [deleted, setDeleted] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const fetched = await PostDataService.getAll()
    .then((response: any) => {
      setPosts(response.data);
      return response.data;
    })
    .catch((e: Error) => {
      setError(e.message)
    });
    return fetched;
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      align: "center" as const,
    },
    {
      title: 'User Id',
      dataIndex: 'userId',
      key: 'userId',
      width: 100,
      align: "center" as const,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      align: "center" as const,
      filters: [
        {
          text: 'officiis',
          value: 'officiis',
        },
        {
          text: 'labore',
          value: 'labore',
        },
        {
          text: 'provident',
          value: 'provident',
        },
      ],
      onFilter: (value: string | number | boolean, record: IPost) => record.title.includes(value as string),
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
      width: 400,
      align: "center" as const,
    },
    {
      key: "action",
      title: "Actions",
      width: 100,
      align: "center" as const,
      render: (record: IPost) => {
        return (
        <>
        <Space direction="horizontal">
            <Tooltip title="Edit">
              <Button type="primary" shape="circle" icon={<EditOutlined/>} onClick={() => onEdit(record)} />
            </Tooltip>
            <Tooltip title="Delete">
              <Button type="primary" danger shape="circle"icon={<DeleteOutlined/>} onClick={() => onDelete(record)}/>
            </Tooltip>
        </Space>
        </>
        );
      },
    }
  ];

  const onDelete = (post: IPost) => {
    setSelectedPost(post);
    setDeleteModalOpen(true);
  }

  const onEdit = (post: IPost) => {
    setSelectedPost(post);
    setEditModalOpen(true);
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px'}}>
        <h2>Posts List</h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gridGap: '5px'}}>
          <Button type="default" onClick={() => setNewPostModalOpen(true)}>Create New Post</Button>
          <span style={{color: 'gray', fontSize: '14px'}}>Deleted Posts: {deleted}</span>
        </div>
      </div>
      {error && <div>Error: {error}</div>}
      <Table dataSource={posts} columns={columns} pagination={{ position: ['bottomCenter'], showSizeChanger: false}} loading={!posts.length} />
      <NewPostModal open={newPostModalOpen} setOpen={setNewPostModalOpen} reloadPosts={fetchPosts} />
      {selectedPost && <EditModal open={editModalOpen} setOpen={setEditModalOpen} post={selectedPost} reloadPosts={fetchPosts}/>}
      {selectedPost && <DeleteModal open={deleteModalOpen} setOpen={setDeleteModalOpen} post={selectedPost} reloadPosts={fetchPosts} setCounter={setDeleted} counter={deleted} />}
    </div>
  )
}

export default PostList;


