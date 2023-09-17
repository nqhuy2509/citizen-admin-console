import React from 'react';
import {Button, Col, message, Row, Table} from "antd";

const Users = () => {

    const [messageApi, contextHolder] = message.useMessage()

    const [dataSource, setDataSource] = React.useState([])

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
                <Row>
                    <Col span={24}>
                        <Table>

                        </Table>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Users;