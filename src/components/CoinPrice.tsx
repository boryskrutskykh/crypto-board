import React from 'react';
import styles from './CryptoTable.module.css';



const CoinPrice = (  ) => {
    return (
        <div className={styles.tableContainer}>
            <h2>Топ монеты, цены:</h2>
            <p>BTC: </p>
            <p>ETH: </p>
            <p>BNB: </p>
        </div>
    );
};

export default CoinPrice;
