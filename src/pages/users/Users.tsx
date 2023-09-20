import React from 'react';
import {Button, Col, message, Row, Table} from "antd";
import {getAllUser} from "../../api/user.api";
import {ProfileModel} from "../../models/profile";
import type {ColumnsType} from 'antd/es/table';
const Users = () => {

    const [messageApi, contextHolder] = message.useMessage()

    const [dataSource, setDataSource] = React.useState<ProfileModel[] >([])

    const columns:ColumnsType<ProfileModel> = [
        {
            title: 'Mã cư dân',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Họ',
            dataIndex: 'firstName',
            key: 'firstName'
        },
        {
            title: 'Tên',
            dataIndex: 'lastName',
            key: 'lastName'
        }
    ]

    React.useEffect(() => {
        const fetchAllProfileUsers = async () => {
            try {
                const response = await getAllUser();
                if(response.status === 200){
                    const data = response.data.data.map((item : ProfileModel) =>
                        {
                            return {
                                ...item,
                                key: item.id
                            } as ProfileModel
                        }
                    );
                    setDataSource(data);
                }
                else{
                    setDataSource([])
                }
            } catch (error) {
                setDataSource([])
                messageApi.error('Lỗi lấy dữ liệu từ server')
            }
        }
        fetchAllProfileUsers().then(r => r);
    }, [])

    return (
        <>
            {contextHolder}
            <div className="">
                <Row>
                    <Col span={24}>
                        <h1>Thông tin người dùng</h1>
                    </Col>


                </Row>
                <Row>
                    <Col>
                        <Button type='primary' size='large'>Thêm người dùng</Button>
                    </Col>
                </Row>
                <Row style={{marginTop: 20}}>
                    <Col span={24} >
                        <Table dataSource={dataSource} columns={columns}>

                        </Table>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Users;