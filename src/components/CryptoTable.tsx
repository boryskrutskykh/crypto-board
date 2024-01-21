import React from 'react';
import {Table} from 'antd';
import styles from './CryptoTable.module.css';
import {CryptoData} from "../types";

interface CryptoTableProps {
    data: CryptoData[];
}

const CryptoTable = ( { data }: CryptoTableProps ) => {
    const columns = [
        {
            title: 'Монета',
            dataIndex: 'coin',
            key: 'coin',
        },
        {
            title: 'Объем $',
            dataIndex: 'volume',
            key: 'volume',
            render: (text: string) => `${text} $`
        },
        {
            title: 'Средняя цена покупки',
            dataIndex: 'averagePrice',
            key: 'averagePrice',
        },
        {
            title: 'Цена текущая',
            dataIndex: 'currentPrice',
            key: 'currentPrice',
        },
        {
            title: 'Количество',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Стоимость',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Прибыль',
            dataIndex: 'profit',
            key: 'profit',
        },
        {
            title: 'Процент',
            dataIndex: 'percentage',
            key: 'percentage',
        },
    ];

    return (
        <div className={styles.tableContainer}>
            <h2>Список моих монет:</h2>
            <br/>
            <Table
                dataSource={data}
                columns={columns}
                pagination={false}
            />
        </div>
    );
};

export default CryptoTable;
