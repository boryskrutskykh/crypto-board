import React from 'react';
import {Modal, Table} from 'antd';
import styles from './CryptoTable.module.css';
import {CryptoData} from "../types";
import DeleteButton from "./Button/DeleteButton";

interface CryptoTableProps {
    data: CryptoData[];
    onDelete: (key: number) => void;
}


const CryptoTable: React.FC<CryptoTableProps> = ({data, onDelete}) => {

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
            sorter: (a: CryptoData, b: CryptoData) => parseFloat(a.volume) - parseFloat(b.volume),
            render: (text: string) => `${parseFloat(text).toFixed(2)} $`
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
            sorter: (a: CryptoData, b: CryptoData) => {
                const priceA = a.price ? parseFloat(a.price) : 0;
                const priceB = b.price ? parseFloat(b.price) : 0;
                return priceA - priceB;
            },
            render: (text: string) => `${parseFloat(text).toFixed(2)} $`
        },
        {
            title: 'Прибыль',
            dataIndex: 'profit',
            key: 'profit',
            sorter: (a: CryptoData, b: CryptoData) => {
                const profitA = a.profit ? parseFloat(a.profit) : 0;
                const profitB = b.profit ? parseFloat(b.profit) : 0;
                return profitA - profitB;
            },
            render: (text: string) => {
                const profit = parseFloat(text);
                return <span style={{color: profit < 0 ? 'red' : 'green'}}><b>{text}</b></span>;
            }
        },
        {
            title: 'Процент',
            dataIndex: 'percentage',
            key: 'percentage',
            sorter: (a: CryptoData, b: CryptoData) => {
                const percentageA = a.percentage ? parseFloat(a.percentage) : 0;
                const percentageB = b.percentage ? parseFloat(b.percentage) : 0;
                return percentageA - percentageB;
            },
            render: (text: string) => {
                const percentage = parseFloat(text);
                return <span style={{color: percentage < 0 ? 'red' : 'green'}}><b>{text}</b></span>;
            }
        },
        {
            key: 'action',
            render: (_: any, record: CryptoData) => (
                <DeleteButton onConfirmDelete={() => onDelete(record.key ?? 0)} />
            ),
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
