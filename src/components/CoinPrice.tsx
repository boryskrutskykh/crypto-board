import React, {useEffect} from 'react';
import styles from './CryptoTable.module.css';
import coinPriceStyles from './CoinPrice.module.css';
import {ReloadOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPrices} from '../store/pricesSlice';
import {AppDispatch, RootState} from '../store';


const CoinPrice = () => {
    const dispatch = useDispatch<AppDispatch>();
    const prices = useSelector((state: RootState) => state.prices.data);
    const loading = useSelector((state: RootState) => state.prices.loading);

    useEffect(() => {
        dispatch(fetchPrices());
    }, [dispatch]);


    return (
        <div className={styles.tableContainer}>
            <h2>Топ монеты, цены. <b>BTC: </b>
                <div className={coinPriceStyles.coinPrice}>{prices.BTC} $</div>
                | <b>ETH: </b>
                <div className={coinPriceStyles.coinPrice}>{prices.ETH} $</div>
                | <b>BNB: </b>
                <div className={coinPriceStyles.coinPrice}>{prices.BNB} $</div>
                <div onClick={() => dispatch(fetchPrices())} className={coinPriceStyles.refreshButton}>
                    <ReloadOutlined spin={loading} style={{fontSize: '24px', color: '#0dff00', marginLeft: '8px'}}/>
                </div>
            </h2>
        </div>
    );
};

export default CoinPrice;
