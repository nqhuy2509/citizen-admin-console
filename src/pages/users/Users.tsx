import React from 'react';
import {Button, Col, message, Modal, Row, Space, Table} from "antd";
import {getAllUser} from "../../api/user.api";
import {ProfileModel} from "../../models/profile";
import type {ColumnsType} from 'antd/es/table';
import Column from "antd/es/table/Column";
import moment from "moment";
import ModalAddUser from "./ModalAddUser";

const Users = () => {

    const [messageApi, contextHolder] = message.useMessage()

    const [dataSource, setDataSource] = React.useState<ProfileModel[]>([])

    const [openModal, setOpenModal] = React.useState<boolean>(false)

    React.useEffect(() => {
        const fetchAllProfileUsers = async () => {
            try {
                const response = await getAllUser();
                if (response.status === 200) {
                    const data = response.data.data.map((item: ProfileModel) => {
                            return {
                                ...item,
                                key: item.id
                            } as ProfileModel
                        }
                    );
                    setDataSource(data);
                } else {
                    setDataSource([])
                }
            } catch (error) {
                setDataSource([])
                messageApi.error('Lỗi lấy dữ liệu từ server')
            }
        }
        fetchAllProfileUsers().then(r => r);
    }, [messageApi])

    const showModal = () => {
        setOpenModal(true)
    }


    return (
        <>
            {contextHolder}
            <Modal title="Thêm người dùng" open={openModal} onCancel={() => setOpenModal(false)}  width={800}>
                <ModalAddUser/>
            </Modal>
            <div className="">
                <Row>
                    <Col span={24}>
                        <h1>Thông tin người dùng</h1>
                    </Col>


                </Row>
                <Row>
                    <Col>
                        <Button type='primary' size='large' onClick={showModal}>Thêm người dùng</Button>
                    </Col>
                </Row>
                <Row style={{marginTop: 20}}>
                    <Col span={24}>
                        <Table dataSource={dataSource}>
                            <Column title="Mã cư dân" key="id" dataIndex="id"/>
                            <Column title="Họ" key="fistName" dataIndex="firstName"/>
                            <Column title="Tên" dataIndex="lastName" key="lastName"/>
                            <Column title="Ngày sinh" dataIndex="dob" key="dob"
                                    render={(dob: string) => moment(dob).format("DD/MM/yyyy")}/>
                            <Column title="Số điện thoại" dataIndex="phoneNumber" key="phoneNumber"
                                    render={(phoneNumber: string) => phoneNumber || "(Chưa cập nhật)"}/>
                            <Column title="Khu/Tòa/Phòng" key="apartment"
                                    render={(_: any, record: ProfileModel) => `${record.id}`}/>
                            <Column title="Tác vụ" key="action" render={(_: any, record: ProfileModel) => (
                                <Space size="middle">
                                    <Button type='primary' size='small'>Sửa</Button>
                                    <Button type='primary' danger size='small'>Xóa</Button>
                                </Space>
                            )}/>
                        </Table>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Users;