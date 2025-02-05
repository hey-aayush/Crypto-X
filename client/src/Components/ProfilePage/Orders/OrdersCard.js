import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import {Card,Typography,Row,Col,Statistic,Progress} from 'antd';
import { LoadingOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import orderIcon from '../../../Images/orderIcon.png';
import './OrderCard.css'
import axios from 'axios';

const {Text} = Typography;

const OrdersCard = () => {

    const [orders,setOrders]=useState({data:undefined,isFetching:true});

    const getOrders=()=>{
        const ordersRoute = process.env.REACT_APP_BACKEND + '/getorders';
        
        axios.get(ordersRoute, {withCredentials: true}).then(res => {
            
            if(res['data']['status']){
                const orders=(res['data']['orders']);
                setOrders({
                    data:orders,
                    isFetching:false
                });
            }
        }).catch(error => {
            console.log(error);
            setOrders({
                data:undefined,
                isFetching:false
            });
        })
    }

    useEffect(()=>{
        getOrders();
    },[])

    return (
        <div>
            <Card 
                style={{width: "fit-content",
                        margin:".5rem auto",
                        borderRadius:"2rem",
                        padding:".2rem",
                        textAlign: "center"}}
                hoverable>

                    <Row>
                        <Col xs={{span:24}} md={{span:4}}  style={{textAlign:"center"}} >
                            <img  alt='img' src={orderIcon} height={'45px'} style={{display: "inline",margin:".2rem 2rem"}}/>
                        </Col>
                        <Col xs={{span:24}} md={{span:20}}  style={{textAlign:"center"}} >
                            <Text strong style={{margin:".2rem",fontSize:"x-large"}}> Orders </Text>
                        </Col>
                    </Row>
                    <hr style={{margin:"0.5rem"}}/>

                    {(orders.isFetching)?(
                        <LoadingOutlined style={{margin:"2rem"}}/>
                    ):(
                        <>
                            {(orders?.data)?(
                                <>
                                    {(orders?.data?.length===0)?(
                                        <>
                                            <Col span={24}>
                                                <ExclamationCircleOutlined />
                                            </Col>
                                            <Col span={24}>
                                                No Orders Placed Yet !
                                            </Col>
                                        </>
                                    ):(
                                        < div className="orders-list">
                                            {orders?.data.map((order,id)=>(
                                                <>
                                                    <Link to={`/BuySell?selectedCoin=${order.coinType}&orderId=${order._id}&orderType=${order.orderType}&coinPrice=${order.price.$numberDecimal}&coinQuantity=${order.quantity.$numberDecimal}&completed=${order.completed.$numberDecimal}`}>
                                                        <Row span={24} key={id}>
                                                            <Col xs={{span:24}} md={{span:6}}>
                                                                <Statistic title="Coin" value={order.coinType} precision={2} />
                                                            </Col>
                                                            <Col xs={{span:24}} md={{span:9}}>
                                                                <Statistic title="Quantity" value={order.quantity.$numberDecimal} precision={2} />
                                                            </Col>
                                                            <Col xs={{span:24}} md={{span:9}}>
                                                                <Statistic title="Amount(₹)" value={(order.price.$numberDecimal)*(order.quantity.$numberDecimal)} precision={2} valueStyle={(order.orderType==='buy')?({color: 'red'}):({color: '#3f8600'})}/>
                                                            </Col>
                                                            <Col span={24}>
                                                                <Progress percent={Math.ceil((order.completed.$numberDecimal*100)/(order.quantity.$numberDecimal))} size="small" />
                                                            </Col>
                                                        </Row>
                                                        <hr style={{margin:"0.5rem"}}/>
                                                    </Link>
                                                </>
                                            ))}
                                        </div>
                                    )}    
                                </>
                            ):(
                                <>
                                    Not Verified !
                                </>
                            )}
                            
                        </>
                    )}
            </Card>
        </div>
    )
}

export default OrdersCard
