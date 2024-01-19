import { auth } from '@/firebaseConfig';
import { Button } from 'antd';
import { buttonStyle } from './ButtonLogout.style';


const ButtonLogout = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      onLogout();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <Button style={buttonStyle} type="primary" onClick={handleLogout}>Logout</Button>
  );
};

export default ButtonLogout;