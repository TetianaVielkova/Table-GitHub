import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { message } from 'antd';
import { signInWithEmailAndPassword } from '../firebaseConfig';
import RootLayout from '@/components/Layout/layout';
import AuthForm from '@/components/AuthForm/AuthForm';
import BackHomeBtn from '@/components/BackHomeBtn/BackHomeBtn';
import { blockStyle, linkStyle } from '@/components/AuthForm/AuthForm.style';
import Link from 'next/link';

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(email, password);
      message.success('Login successful!');
      router.replace('/dashboard');
    } catch (error) {
      message.error('Login failed');
    }
  };

  return (
    <RootLayout>
      <div style={{margin:'30px'}}>
      <BackHomeBtn/>
      </div>
      <div style={blockStyle}>
        <h1>Login</h1>
        <AuthForm onSubmit={handleLogin} />
        <p >
          Don`t have an account?{' '}
          <Link href="/register" style={linkStyle}>
            Register here
          </Link>
        </p>
      </div>
    </RootLayout>
  );
};

export default LoginPage;