import React from 'react';
import {Modal, Input, Form, Button} from 'antd';
import {CryptoData} from "../types";
import axios from 'axios';

interface AddCryptoFormProps {
    onAdd: (newData: Omit<CryptoData, 'key'>) => void;
    isVisible: boolean;
    onCancel: () => void;
}

const AddCryptoForm = ({onAdd, isVisible, onCancel}: AddCryptoFormProps) => {

    const [form] = Form.useForm();

    const validateNumberInput = async (_: any, value: string) => {
        if (!value || /^\d+(\.\d+)?$/.test(value)) {
            return;
        }
        throw new Error('Пожалуйста, введите целое число или число с плавающей запятой');
    };

    const fetchCurrentPrice = async (coinName: string) => {
        try {
            const response = await axios.get(`https://www.binance.com/api/v3/ticker/price?symbol=${coinName}USDT`);
            return response.data.price;
        } catch (error) {
            console.error("Ошибка при получении цены:", error);
            return null;
        }
    };

    const calculateAveragePrice = (volume: number, amount: number): string => {
        return volume && amount ? (volume / amount).toFixed(2) : '0';
    };

    const handleSubmit = async (values: any) => {
        const currentPrice = await fetchCurrentPrice(values.priceUrl);

        const totalCost = Number(values.amount) * (currentPrice || 0);
        const profit = totalCost - Number(values.volume);
        const percentage = Number(values.volume) !== 0 ? (profit * 100) / Number(values.volume) : 0;


        const newData = {
            ...values,
            currentPrice: currentPrice || 'Цена не найдена',
            averagePrice: calculateAveragePrice(Number(values.volume), Number(values.amount)),
            price: Number(values.amount) * (currentPrice || 0),
            profit: `${profit.toFixed(2)} $`,
            percentage: `${percentage.toFixed(2)} %`
        };

        onAdd(newData);
        form.resetFields();
    };

    return (
        <Modal
            title="Добавить новую монету"
            open={isVisible}
            onCancel={onCancel}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="coin"
                    label="Монета"
                    rules={[{required: true, message: 'Пожалуйста, введите название монеты'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="volume"
                    label="Объем"
                    rules={[{validator: validateNumberInput}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="amount"
                    label="Количество монет"
                    rules={[{validator: validateNumberInput}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="priceUrl"
                    label="Название монеты для получения цены"
                    rules={[{required: true, message: 'Пожалуйста, введите название монеты.'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item>
                    <Button key="back" onClick={onCancel}>
                        Отмена
                    </Button>
                    <Button style={{marginLeft: "3%"}} key="submit" type="primary" htmlType="submit">
                        Добавить
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddCryptoForm;
