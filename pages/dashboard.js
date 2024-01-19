import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebaseConfig';
import {Layout, Menu} from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { RightOutlined } from '@ant-design/icons';
import ButtonLogout from '@/components/ButtonLogout/ButtonLogout';
import ButtonAddRepos from '@/components/ButtonAddRepos/ButtonAddRepos';
import TableRepositories from '@/components/TableRepositories/TableRepositories.js';
import { siderStyle, contentStyle, layoutStyle } from '@/components/Layout/layout.style';
import RootLayout from '@/components/Layout/layout';


const DashboardPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                router.push('/login');
            } else {
                setLoading(false);
            }});

        return () => {
            unsubscribe();
        };
    }, [router]);

    const handleLogout = () => {
        router.push('/login');
    };

    if (loading) {
        return null;
    }

    return (
        <RootLayout>
            <Layout style={layoutStyle}>
                <Sider width ="15%" style={siderStyle}>
                <div className="demo-logo-vertical" />
                    <Menu
                        style={{marginTop:'20px'}}
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[{key: '1', label: 'GitHub repositories',  icon: <RightOutlined />}]}
                    />
                    <ButtonLogout onLogout={handleLogout} />
                </Sider>
                <Layout>
                    <Content style={contentStyle}>
                        <ButtonAddRepos/>
                        <TableRepositories/>
                    </Content>
                </Layout>
            </Layout>
        </RootLayout>
    );
};

export default DashboardPage;