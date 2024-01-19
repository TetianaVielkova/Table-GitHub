import { useRouter } from 'next/router';
import { message } from 'antd';
import { createUserWithEmailAndPassword } from '../firebaseConfig';  
import AuthForm from '@/components/AuthForm/AuthForm';
import RootLayout from '@/components/Layout/layout';
import BackHomeBtn from '@/components/BackHomeBtn/BackHomeBtn';
import { blockStyle, linkStyle } from '@/components/AuthForm/AuthForm.style';
import Link from 'next/link';

const RegisterPage = () => {
  const router = useRouter();

  const handleRegister = async ({ email, password }) => {
    try {
      await createUserWithEmailAndPassword(email, password);
      message.success('Registration successful! Please login.');
      router.push('/login');
    } catch (error) {
      message.error('Registration failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <RootLayout>
      <div style={{margin:'30px'}}>
        <BackHomeBtn/>
      </div>
      <div  style={blockStyle}>
        <h1>Register</h1>
        <AuthForm onSubmit={handleRegister} isRegister />
        <p>
          Already have an account?{' '}
          <Link href="/login" style={linkStyle}>
            Login here
          </Link>
        </p>
      </div>
    </RootLayout>
  );
};

export default RegisterPage;