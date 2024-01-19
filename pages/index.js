import Link from 'next/link';
import RootLayout from '@/components/Layout/layout';
import { blockStyle, linkStyle } from '@/components/Layout/layout.style';

const HomePage = () => {
  return (
    <RootLayout>
      <div style={blockStyle}>
        <h1>Welcome to My Dashboard with GitHub repositories</h1>
        <div>
          <Link href="/login" style={linkStyle}>
            Login
          </Link>
          <Link href="/register" style={linkStyle}>
            Register
          </Link>
        </div>
      </div>
    </RootLayout>
  );
};

export default HomePage;