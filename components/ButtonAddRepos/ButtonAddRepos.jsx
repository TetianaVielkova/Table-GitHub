import React, { useState } from 'react';
import { Button } from 'antd';
import RepositoryModal from '../RepositoryModal/RepositoryModal';
import { btnBoxStyle } from './ButtonAddRepos.style';

function ButtonAddRepos() {
  const [visible, setVisible] = useState(false);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleSubmitForm = (formData) => {
    setVisible(false);
  };

  return (
    <>
      <div style={btnBoxStyle}>
        <Button type="primary" size="large" onClick={handleOpenModal}>
          Add new repository
        </Button>
      </div>
      <RepositoryModal
        visible={visible}
        onCancel={handleCloseModal}
        onSubmit={handleSubmitForm}
      />
    </>
  );
}

export default ButtonAddRepos;
