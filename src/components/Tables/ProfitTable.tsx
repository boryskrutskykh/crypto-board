import React from 'react';
import styles from './ProfitTable.module.css'
import {motion} from 'framer-motion';

const ProfitTable = () => {

    const data = {
        starterPortfolioPrice: '1000 $',
        portfolioPrice: '1500 $',
        portfolioProfit: '500 $',
        totalPercentage: '67 %',
    };
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 2}}
            className={styles.tableContainer}
        >
            {<div className={styles.table}>
                <div className={styles.bgColor}>
                    <div className={styles.row}>
                        <div className={styles.cell}><span>Цена портфеля начальная</span></div>
                        <div className={styles.cell}><b>{data.starterPortfolioPrice}</b></div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.cell}><span>Цена портфеля</span></div>
                        <div className={styles.cell}><b>{data.portfolioPrice}</b></div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.cell}><span>Прибыль по портфелю</span></div>
                        <div className={styles.cell}><b>{data.portfolioProfit}</b></div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.cell}><span>Общий % по портфелю</span></div>
                        <div className={styles.cell}><b>{data.totalPercentage}</b></div>
                    </div>
                </div>
            </div>}
        </motion.div>
    );
};

export default ProfitTable;
