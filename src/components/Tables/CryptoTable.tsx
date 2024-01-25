import React, {useState} from 'react';
import {Table, Form} from 'antd';
import styles from './CryptoTable.module.css';
import {CryptoData} from "../../types";
import DeleteButton from "../Button/DeleteButton";
import EditableCell from '../../components/Tables/EditableCell';
import {EditOutlined, CheckOutlined, CloseOutlined} from '@ant-design/icons';
import {fetchCurrentPrice} from "../../utils/fetchPrice";

interface CryptoTableProps {
    data: CryptoData[];
    onDeleteConfirm: (key: number) => void;
    onSave: (updatedRecord: CryptoData) => void;
}

const CryptoTable: React.FC<CryptoTableProps> = ({data, onDeleteConfirm, onSave}) => {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState<number | null>(null);

    const isEditing = (record: CryptoData) => record.key === editingKey;

    const edit = (record: CryptoData) => {
        form.setFieldsValue({...record});
        setEditingKey(record.key ?? null);
    };

    // const fetchCurrentPrice = async (coinName: string) => {
    //     try {
    //         const response = await axios.get(stockExchange.BINANCE(coinName));
    //         return response.data.price || response.data.last;
    //     } catch (error) {
    //         console.error("Ошибка на Binance API:", error);
    //         try {
    //             const response = await axios.get(stockExchange.GATE(coinName));
    //             return response.data.price || response.data.last;
    //         } catch (error) {
    //             console.error("Ошибка на Gate.io API:", error);
    //             return null;
    //         }
    //     }
    // };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as CryptoData;
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                if (isNaN(Number(row.currentPrice))) {
                    const fetchedPrice = await fetchCurrentPrice(row.currentPrice ?? '');
                    if (fetchedPrice) {
                        item.currentPrice = fetchedPrice.toString();
                        row.currentPrice = fetchedPrice.toString();
                    } else {
                        form.setFields([{name: 'currentPrice', errors: ['Монета не найдена на бирже']}]);
                        return;
                    }
                } else {
                    item.currentPrice = Number(row.currentPrice).toString();
                }

                newData[index] = {...item, ...row};
                onSave(newData[index]);
                setEditingKey(null);
            }
        } catch (errInfo) {
            console.log('Ошибка валидации:', errInfo);
        }
    };


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
            render: (text: string) => `${parseFloat(text).toFixed(2)} $`,
            editable: true,
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
            editable: true
        },
        {
            title: 'Количество',
            dataIndex: 'amount',
            key: 'amount',
            editable: true,
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
                <DeleteButton keyToDelete={record.key ?? 0} onDeleteConfirm={onDeleteConfirm}/>
            ),
        },
        {
            key: 'action',
            render: (_: any, record: CryptoData) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
        <button
            onClick={() => record.key !== undefined && save(record.key)}
            style={{marginRight: 8, background: "#0dff00"}}
            className={styles.buttonStyle}
        >
            <CheckOutlined/>
        </button>
        <button
            onClick={() => setEditingKey(null)}
            style={{background: "#ff4d4f"}}
            className={styles.buttonStyle}
        >
            <CloseOutlined/>
        </button>
    </span>
                ) : (
                    <button
                        disabled={editingKey !== null}
                        onClick={() => edit(record)}
                        className={styles.buttonStyle}
                    >
                        <EditOutlined/>
                    </button>
                );
            },
        },
    ];


    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: CryptoData) => ({
                record,
                inputType: col.dataIndex === 'volume' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <div className={styles.tableContainer}>
            <h2>Список моих монет:</h2>
            <br/>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={false}
                />
            </Form>
        </div>
    );
};

export default CryptoTable;
