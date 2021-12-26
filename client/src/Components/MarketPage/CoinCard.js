import React from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card,Col} from 'antd';
import {FallOutlined,RiseOutlined} from '@ant-design/icons';

const CoinCard = ({currency,id}) => {
    return (
        <Col key={id} xs={24} sm={12} lg={6} className='crypto-card'>
            <Link to={`/crypto/${currency.id}`}>
                <Card
                    style={{borderRadius:"2rem"}}
                    title={`${currency.rank}. ${currency.name}`}
                    extra={<img className='crypto-image' alt='img' src={currency.iconUrl}/>}
                    hoverable
                >
                    <p>Price : $ {millify(currency.price)}</p>
                    <p>Market Cap: {millify(currency.marketCap)}</p>
                    <p>DailyChange : {millify(currency.change)} % {(currency.change < 0)?(<FallOutlined style={{color: "red"}} />):(<RiseOutlined style={{color: "green"}} />)}</p>
                </Card>
            </Link>
        </Col>
    )
}

export default CoinCard
