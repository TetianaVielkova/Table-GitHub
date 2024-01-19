import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag, Popconfirm } from 'antd';
import deleteRepository from '@/helpers/deleteRepos';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import RepositoryModal from '../RepositoryModal/RepositoryModal';

const languageColorMapping = {
  HTML: 'red',
  CSS: 'blue',
  SCSS: 'green',
  JavaScript: 'orange',
  TypeScript: 'purple',
};

const TableRepositories = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editRepositoryId, setEditRepositoryId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, 'repositories'));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(data);
    };

    fetchData();
  }, [data]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      render: (text) => <a>{text.toUpperCase()}</a>,
    },
    {
      title: 'Commit',
      dataIndex: 'Commit',
      key: 'Commit',
    },
    {
      title: 'Date',
      dataIndex: 'Date',
      key: 'Date',
    },
    {
      title: 'Language',
      key: 'Language',
      dataIndex: 'Language',
      render: (_, record) => (
        <>
          {(record.Language || []).map((language, index) => {
            const color = languageColorMapping[language] || 'gray';
            return (
              <Tag color={color} key={`${language}_${index}`}>
                {language.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record.id)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this repository?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  //=====Delete==============================================
  const handleDelete = async (id) => {
    console.log(`Deleting repository with id: ${id}`);
    await deleteRepository(id);
  };

  const handleEdit = (id) => {
    setEditRepositoryId(id);
    setModalVisible(true);
  };

  const handleEditSubmit = async (data) => {
    try {
      console.log('Editing repository with id:', editRepositoryId, 'Data:', data);

      const db = getFirestore();
      const docRef = doc(db, 'repositories', editRepositoryId);
      await updateDoc(docRef, data);
      console.log('Repository data updated successfully.');

      setEditRepositoryId(null);
      setModalVisible(false);
    } catch (error) {
      console.error('Error updating repository data:', error);
    }
  };

  return (
    <>
      <Table columns={columns} dataSource={data} />
      <RepositoryModal
        visible={modalVisible}
        onCancel={() => {
          setEditRepositoryId(null);
          setModalVisible(false);
        }}
        onSubmit={handleEditSubmit}
        initialData={data.find((item) => item.id === editRepositoryId)}
        isEditMode={true}
      />
    </>
  );
};

export default TableRepositories;