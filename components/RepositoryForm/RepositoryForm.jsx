import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Input, Select, DatePicker } from 'antd';
import { addDoc, collection, doc, setDoc} from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import moment from 'moment';

const { Option } = Select;

const languageOptions = [
  { value: 'HTML', label: 'HTML' },
  { value: 'CSS', label: 'CSS' },
  { value: 'SCSS', label: 'SCSS' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'TypeScript', label: 'TypeScript' },
];

const RepositoryForm = ({ onSubmit, closeModal, isEditMode, initialData }) => {
  const {
    handleSubmit,
    setValue,
    reset,
  } = useForm({ mode: 'onChange', defaultValues: initialData });


  const saveDataToFirebase = async (data) => {
    const db = getFirestore();
    const formattedDate = moment(data.Date).format('YYYY-MM-DD');
    try {
      const docRef = await addDoc(collection(db, 'repositories'), {
        ...data,
        Date: formattedDate,
      });
      const generatedId = docRef.id;
      await setDoc(doc(db, 'repositories', generatedId), {
        ...data,
        id: generatedId,
      });
      closeModal();
      reset(initialData);
    } catch (error) {
      console.error('Error writing to Firestore:', error);
    }
  };

  const SubmitForm = (data) => {
    if (isEditMode) {
      onSubmit(data);
    } else {
      saveDataToFirebase(data);
    }
    closeModal();
    reset();
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(SubmitForm)}>
      <Form.Item
        label="Name"
        name="Name"
        rules={[{ required: true, message: 'Please enter a name' }]}
      >
        <Input onChange={(e) => setValue('Name', e.target.value)} />
      </Form.Item>
      <Form.Item
        label="Commit"
        name="Commit"
        rules={[
          { required: true, message: 'Please enter a commit' },
        ]}
      >
        <Input type="number" onChange={(e) => setValue('Commit', e.target.value)} />
      </Form.Item>
      <Form.Item
        label="Language"
        name="Language"
        rules={[{ required: true, message: 'Please select a language' }]}
      >
        <Select
          mode="multiple"
          onChange={(value) => setValue('Language', value)}
        >
          {languageOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Date"
        name="Date"
        rules={[{ required: true, message: 'Please select a date' }]}
      >
        <DatePicker onChange={(value) => setValue('Date', value)} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RepositoryForm;




