import { Form, Input, Button, Alert } from 'antd';

const AuthForm = ({ onSubmit, isRegister }) => {
  const onFinish = (values) => {
    onSubmit(values);
  };

  return (
    <Form
      name="authForm"
      onFinish={onFinish}
      labelCol={{ span: 9 }}
      wrapperCol={{ span: 6 }}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'Please enter a valid email address!' },
        ]}
      >
        <Input placeholder="Enter your email" autoComplete="current-email"/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Please input your password!' },
          { min: 6, message: 'Password must be at least 6 characters long' },
        ]}
      >
        <Input.Password placeholder="Enter your password" autoComplete="current-password" />
      </Form.Item>

      {isRegister && (
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm your password" autoComplete="new-password"/>
        </Form.Item>
      )}

      <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
        <Button type="primary" htmlType="submit">
          {isRegister ? 'Register' : 'Login'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AuthForm;
