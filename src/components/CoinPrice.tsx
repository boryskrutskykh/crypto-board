import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import styles from './CryptoTable.module.css';
import coinPriceStyles from './CoinPrice.module.css';
import { ReloadOutlined } from '@ant-design/icons';


const CoinPrice = () => {
    const [prices, setPrices] = useState({BTC: '', ETH: '', BNB: ''});
    const [loading, setLoading] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);


    const fetchPrices = useCallback(async () => {
        setLoading(true);
        const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT'];

        for (const symbol of symbols) {
            try {
                const response = await axios.get(`https://www.binance.com/api/v3/ticker/price?symbol=${symbol}`);
                const roundedPrice = Math.floor(response.data.price);
                setPrices(prevPrices => ({...prevPrices, [symbol.slice(0, -4)]: roundedPrice}));
            } catch (error) {
                console.error(`Ошибка при получении данных для ${symbol}:`, error);
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (isInitialLoad) {
            fetchPrices().catch(error => {
                console.error("Ошибка при получении данных:", error);
            });
            setIsInitialLoad(false);
        }
    }, [fetchPrices, isInitialLoad]);


    return (
        <div className={styles.tableContainer}>
            <h2>Топ монеты, цены. <b>BTC: </b>
                <div className={coinPriceStyles.coinPrice}>{prices.BTC} $ </div>
                | <b>ETH: </b>
                <div className={coinPriceStyles.coinPrice}>{prices.ETH} $ </div>
                | <b>BNB: </b>
                <div className={coinPriceStyles.coinPrice}>{prices.BNB} $</div>
                <div onClick={fetchPrices} className={coinPriceStyles.refreshButton}>
                    <ReloadOutlined spin={loading} style={{ fontSize: '24px', color: '#0dff00', marginLeft: '8px' }} />
                </div>
            </h2>
        </div>
    );
};

export default CoinPrice;
