import React from 'react';
import { Table } from 'antd';
import { mockData } from '../mockData';

const CryptoTable = () => {
    const columns = [
        {
            title: 'Монета',
            dataIndex: 'coin',
            key: 'coin',
        },
        {
            title: 'Объем',
            dataIndex: 'volume',
            key: 'volume',
        },
    ];

    return <Table dataSource={mockData} columns={columns} />;
};

export default CryptoTable;
