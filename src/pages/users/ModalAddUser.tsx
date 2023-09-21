import React from 'react';
import {Col, Form, Input, Row} from "antd";

const ModalAddUser = () => {
    return (
        <Form style={{marginTop: 30}} size='large' layout='vertical'>
            <Row>
               <Col span={10}>
                   <Form.Item label="Họ">
                       <Input />
                   </Form.Item>
               </Col>
                <Col span={10} offset={4}>
                    <Form.Item label="Tên">
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            
        </Form>
    );
};

export default ModalAddUser;