import React from 'react'
import { Typography,Card,Button,Row,Col,Form, Input,Tabs  } from 'antd';
import { PlusCircleOutlined} from '@ant-design/icons';
import BankCard from './BankCard'
import bankIcon from '../../Images/bankIcon.png'
import WalletIcon from '../../Images/wallet.png'

const { Text,Title } = Typography;
const { TabPane } = Tabs;

const BankOptions = () => {
    const layout = {
        labelCol: { offset: 4,span: 6 },
        wrapperCol: { span: 10 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    return (
        <div>
            <div className="banking-div">
                <div className="banking-headind-div">
                    <Title level={3} style={{margin:".5rem",padding:".5rem"}}><img alt='img' src={bankIcon} height={'30px'}/> Banking and Payment Options</Title>
                </div>
                <Title level={5} > ( Add and save different payment methods for adding and withdrawing from wallet. ) </Title>
                <hr/>
                <div className="saved-options">

                    <Row>
                        
                        <Col xs={{span:24}} lg={{span:8}} style={{padding:".5rem"}}>
                           
                                <Row style={{borderBottom:".5px dotted black",backgroundColor:"transparent",margin:"0.5rem auto",padding:".5rem 0rem"}}>
                                    <Col span={20}>
                                        <Title level={4}><img className='crypto-image' alt='img' src={WalletIcon} height={'40px'}/> Saved Methods </Title>
                                    </Col>
                                    <Col span={4} style={{textAlign:"center"}}>
                                        <Button type="primary" shape="circle"><PlusCircleOutlined/></Button>
                                    </Col>
                                </Row>
                            
                            <Row>
                                <Col span={24}><BankCard/></Col>
                                <Col span={24}><BankCard/></Col>
                                <Col span={24}><BankCard/></Col>
                                <Col span={24}><BankCard/></Col>
                            </Row>                            
                        </Col>
                        <Col xs={{span:24}} lg={{span:16}}  style={{padding:".5rem"}}>
                                <Row style={{borderBottom:".5px dotted black",backgroundColor:"transparent",margin:"0.5rem auto",padding:".5rem 0rem"}}>
                                    <Col span={20}>
                                        <Title level={4}><img className='crypto-image' alt='img' src={WalletIcon} height={'40px'}/> Add New Methods </Title>
                                    </Col>
                                    <Col span={4} style={{textAlign:"center"}}>
                                        <Button type="primary" shape="circle"><PlusCircleOutlined/></Button>
                                    </Col>
                                </Row>
                                <Card>

                                <Tabs defaultActiveKey="1" >
                                    <TabPane tab="Add Account" key="1">
                                            <Form name="control-hooks" {...layout}>
                                                <Form.Item name="name" label="Name :" rules={[{ required: true }]}>
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item name="account" label="Account No:" rules={[{ required: true }]}>
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item name="ifsc" label="IFSC Code:" rules={[{ required: true }]}>
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                                    <Button type="primary" htmlType="submit">
                                                        Save
                                                    </Button>
                                                </Form.Item>
                                            </Form>
                                    </TabPane>
                                    <TabPane tab="Add UPI" key="2">
                                        <Form name="control-hooks" {...layout}>
                                            <Form.Item name="name" label="Name :" rules={[{ required: true }]}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item name="upiid" label="UPI ID :" rules={[{ required: true }]}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                                <Button type="primary" htmlType="submit">
                                                    Save
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </TabPane>
                                </Tabs>

                                
                                </Card>

                        </Col>
                    </Row>
                    
                </div>
            </div>
        </div>
    )
}

export default BankOptions
