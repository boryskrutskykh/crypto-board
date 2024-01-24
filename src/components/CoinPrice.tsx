import React, {useEffect} from 'react';
import styles from "../components/Tables/CryptoTable.module.css";
import coinPriceStyles from './CoinPrice.module.css';
import {ReloadOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPrices} from '../store/pricesSlice';
import {AppDispatch, RootState} from '../store';
import {motion} from 'framer-motion';


const CoinPrice = () => {
    const dispatch = useDispatch<AppDispatch>();
    const prices = useSelector((state: RootState) => state.prices.data);
    const loading = useSelector((state: RootState) => state.prices.loading);

    useEffect(() => {
        dispatch(fetchPrices());
    }, [dispatch]);


    return (

        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 2}}
        >
            {<div className={styles.tableContainer}>
                <div className={coinPriceStyles.coinPriceWrapper}>
                    <span>BTC: </span>
                    <div className={coinPriceStyles.coinPrice}><b>{prices.BTC}</b> $ </div>
                    | <span>ETH: </span>
                    <div className={coinPriceStyles.coinPrice}><b>{prices.ETH}</b> $ </div>
                    | <span>BNB: </span>
                    <div className={coinPriceStyles.coinPrice}><b>{prices.BNB}</b> $</div>
                    <div onClick={() => dispatch(fetchPrices())} className={coinPriceStyles.refreshButton}>
                        <ReloadOutlined spin={loading} style={{fontSize: '24px', color: '#0dff00', marginLeft: '8px'}}/>
                    </div>
                </div>
            </div>}
        </motion.div>
    );
};

export default CoinPrice;
