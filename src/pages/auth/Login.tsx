import React, {useEffect, useState} from 'react';
import './Login.scss';
import {Button, Checkbox, Form, Input, message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {login, logout} from "../../redux/thunks/auth.thunk";
import {IAuthState} from "../../redux/reducers/auth.slice";
import {useNavigate} from "react-router-dom";


type FieldType = {
    username?: string,
    password?: string,
    remember?: boolean
}

const Login: React.FC = () => {

        const dispatch = useDispatch()

        const navigate = useNavigate()

        const [messageApi, contextHolder] = message.useMessage()

        const [loading, setLoading] = useState(false)

        const handleLogin = async (values: FieldType) => {
            setLoading(true)
            await dispatch(login(values.username!, values.password!))
        }

        const authState = useSelector((state: { auth: IAuthState }) => state.auth)

        useEffect(() => {
            setLoading(false)
            if (authState.isLogin) {
                navigate('/')
            } else {
                if (authState.error == null) return;
                messageApi.open(
                    {
                        type: 'error',
                        content: authState.error,
                        duration: 3
                    }
                ).then(r => {
                    dispatch(logout())

                })
            }
        }, [authState.error, authState.isLogin, dispatch, messageApi, navigate])


        useEffect(() => {
            dispatch(logout())
        }, [dispatch]);

        return (
            <>
                {contextHolder}
                <div className='container'>
                    <div className="main">
                        <div className="logo">
                            <img src={process.env.PUBLIC_URL + 'images/banner_logo.png'} alt="banner-logo"/>
                        </div>
                        <h1 className='header'>Login</h1>
                        <Form name='login_form' className='login-form' initialValues={{remember: true}} autoComplete='off'
                              layout='vertical' onFinish={handleLogin}>
                            <Form.Item<FieldType> label='Username: ' name='username' rules={
                                [
                                    {required: true, message: 'Please input your username!'}
                                ]
                            }>
                                <Input/>
                            </Form.Item>
                            <Form.Item<FieldType> label='Password: ' name='password' rules={
                                [
                                    {required: true, message: 'Please input your password!'}
                                ]
                            }>
                                <Input.Password/>
                            </Form.Item>
                            <Form.Item<FieldType>
                                name="remember"
                                valuePropName="unchecked"
                                wrapperCol={{span: 8}}
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <Form.Item>
                                <Button type='primary' htmlType='submit' style={{width: '100%'}}
                                        loading={loading}>Login</Button>
                            </Form.Item>
                        </Form>
                    </div>

                </div>
            </>
        );
    }
;

export default Login;