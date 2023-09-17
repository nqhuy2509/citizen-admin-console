import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {DashboardOutlined, UsergroupDeleteOutlined} from "@ant-design/icons";

import type {MenuProps} from "antd";
import {Button, Layout, Menu, theme} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {useDispatch} from "react-redux";
import {logout} from "../../redux/thunks/auth.thunk";

const {Sider} = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]) {
    return {
        key, icon, children, label
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Dashboard', '1', <DashboardOutlined/>),
    getItem('Citizens', '2', <UsergroupDeleteOutlined/>)
]

const BaseLayout: React.FC<{ children: React.ReactNode }> = ({children}) => {

    const [collapsed, setCollapsed] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const isLoginPage = location.pathname === "/login";

    const dispatch = useDispatch();

    const changeMenuItem = (e: any) => {
        switch (e.key){
            case '1':
                navigate('/');
                break;
            case '2':
                navigate('/users');
                break;
        }
    }

    const handleLogout = () => {
        dispatch(logout())
    }


    return (
        <>
            {
                isLoginPage ? <>{children}</> : (
                    <Layout style={{minHeight: '100vh'}}>
                        <Sider collapsible collapsed={collapsed} onCollapse={(value)=> setCollapsed(value)}>
                            <div style={{
                                height: 32,
                                margin: 16,
                                background: 'rgba(255, 255, 255, 0.2)',
                            }}>

                            </div>

                            <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline' onClick={changeMenuItem} items={items}>
                                {/* <Menu.Item key='/'>
							<Link to='/'>DashBoard</Link>
						</Menu.Item>

						<Menu.Item key='/products'>
							<Link to='/products'>Products</Link>
						</Menu.Item> */}
                            </Menu>
                        </Sider>

                        <Layout className='site-layout'>
                            <Header style={{
                                padding: 10,
                                marginBottom:20,
                            }}>
                                <Button danger type='primary' size='large' style={{ float: 'right' }} onClick={handleLogout}>
                                    Logout
                                </Button>

                            </Header>
                            <Content style={{
                                margin: '0 16px',
                            }}>
                                <div
                                    style={{
                                        padding: 24,
                                    }}>
                                    {children}
                                </div>

                            </Content>
                        </Layout>
                    </Layout>
                )
            }
        </>
    );
};

export default BaseLayout;