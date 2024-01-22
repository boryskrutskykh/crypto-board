import React from 'react';
import styles from './ProfitTable.module.css'
import {motion} from 'framer-motion';

interface ProfitTableProps {
    cryptoData: Array<{
        volume: string;
        price?: string;
    }>;
}

const ProfitTable: React.FC<ProfitTableProps> = ({cryptoData}) => {

    // const calculateTotalVolume = (data: ProfitTableProps['cryptoData']): string => {
    //     const totalVolume = data.reduce((acc, item) => acc + Number(item.volume), 0);
    //     return `${Math.round(totalVolume)} $`;
    // };
    //
    // const calculateTotalPrice = (data: ProfitTableProps['cryptoData']): string => {
    //     const totalPrice = data.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
    //     return `${Math.round(totalPrice)} $`;
    // };
    //
    // const calculatePortfolioProfit = (): string => {
    //     const totalVolume = cryptoData.reduce((acc, item) => acc + Number(item.volume), 0);
    //     const totalPortfolioPrice = cryptoData.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
    //     const profit = totalPortfolioPrice - totalVolume;
    //     return `${Math.round(profit)} $`;
    // };
    //
    // const calculateTotalPercentage = (profit: number, starterPrice: number): string => {
    //     if (starterPrice === 0) return '0 %';
    //     const percentage = (profit * 100) / starterPrice;
    //     return `${percentage.toFixed(2)} %`;
    // };
    //
    // const starterPortfolioPrice = calculateTotalVolume(cryptoData);
    // const portfolioPrice = calculateTotalPrice(cryptoData);
    // const profitPortfolioPrice = calculatePortfolioProfit();
    //
    // const totalProfit = cryptoData.reduce((acc, item) => acc + (Number(item.price) || 0), 0) - cryptoData.reduce((acc, item) => acc + Number(item.volume), 0);
    //
    // const starterPortfolioPriceCalculations = cryptoData.reduce((acc, item) => acc + Number(item.volume), 0);
    //
    //
    // const totalPercentage = calculateTotalPercentage(totalProfit, starterPortfolioPriceCalculations);

    const calculateTotal = (data: ProfitTableProps['cryptoData'], key: 'volume' | 'price') => {
        return data.reduce((acc, item) => acc + Number(item[key] || 0), 0);
    };

    const totalVolume = calculateTotal(cryptoData, 'volume');
    const totalPortfolioPrice = calculateTotal(cryptoData, 'price');
    const profit = totalPortfolioPrice - totalVolume;
    const totalPercentage = totalVolume === 0 ? '0 %' : `${((profit * 100) / totalVolume).toFixed(2)} %`;

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
                        <div className={styles.cell}><b>{totalVolume} $</b></div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.cell}><span>Цена портфеля</span></div>
                        <div className={styles.cell}><b>{totalPortfolioPrice.toFixed(0)} $</b></div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.cell}><span>Прибыль по портфелю</span></div>
                        <div className={styles.cell}><b style={{color: profit < 0 ? 'red' : '#0dff00'}}>
                            {profit.toFixed(2)} $
                        </b></div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.cell}><span>Общий % по портфелю</span></div>
                        <div className={styles.cell}><b
                            style={{color: parseFloat(totalPercentage) < 0 ? 'red' : '#0dff00'}}>
                            {totalPercentage} $
                        </b></div>
                    </div>
                </div>
            </div>}
        </motion.div>
    );
};

export default ProfitTable;
