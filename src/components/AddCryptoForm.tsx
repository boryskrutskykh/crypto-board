import React, {useState} from 'react';
import {Modal, Input, Form, Button} from 'antd';
import {CryptoData} from "../types";
import axios from 'axios';
import {Radio} from 'antd';
import stockExchange from "../router/stockExchange";

interface AddCryptoFormProps {
    onAdd: (newData: Omit<CryptoData, 'key'>) => void;
    isVisible: boolean;
    onCancel: () => void;
}

const AddCryptoForm = ({onAdd, isVisible, onCancel}: AddCryptoFormProps) => {
    const [form] = Form.useForm();
    const [selectedApi, setSelectedApi] = useState('binance');
    const [manualCurrentPrice, setManualCurrentPrice] = useState(false);

    const toggleManualCurrentPrice = () => {
        setManualCurrentPrice(!manualCurrentPrice);
        form.resetFields(['currentPrice', 'priceUrl']); // Сбросить значения полей, связанных с ценой
    };

    const validateNumberInput = async (_: any, value: string) => {
        if (!value || /^\d+(\.\d+)?$/.test(value)) {
            return;
        }
        throw new Error('Пожалуйста, введите целое число или число с плавающей запятой');
    };

    const fetchCurrentPrice = async (coinName: string) => {
        let url;
        switch (selectedApi) {
            case 'binance':
                url = stockExchange.BINANCE(coinName);
                break;
            case 'gate':
                url = stockExchange.GATE(coinName);
                break;
            default:
                url = stockExchange.BINANCE(coinName);
        }
        try {
            const response = await axios.get(url);
            console.log(response.data)
            return response.data.price || response.data.last;
        } catch (error) {
            console.error("Ошибка при получении цены:", error);
            return null;
        }
    };


    const calculateAveragePrice = (volume: number, amount: number): string => {
        return volume && amount ? (volume / amount).toFixed(2) : '0';
    };

    const handleSubmit = async (values: any) => {
        let currentPrice;

        if (!manualCurrentPrice) {
            currentPrice = await fetchCurrentPrice(values.priceUrl);
        } else {
            currentPrice = values.currentPrice;
        }

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
                    name="currentPrice"
                    label="Цена текущая"
                    rules={[{required: manualCurrentPrice, message: 'Введите текущую цену'}]}
                    hidden={!manualCurrentPrice}
                >
                    <Input disabled={!manualCurrentPrice}/>
                </Form.Item>
                <Form.Item
                    name="priceUrl"
                    label="Название монеты для получения цены"
                    rules={[{required: !manualCurrentPrice, message: 'Пожалуйста, введите название монеты.'}]}
                    hidden={manualCurrentPrice}
                >
                    <Input disabled={manualCurrentPrice}/>
                </Form.Item>
                <Form.Item>
                    <Button key="back" onClick={onCancel}>
                        Отмена
                    </Button>
                    <Button style={{marginLeft: "3%"}} key="submit" type="primary" htmlType="submit">
                        Добавить
                    </Button>
                    <Button style={{marginLeft: "3%"}} onClick={toggleManualCurrentPrice}>
                        {manualCurrentPrice ? "Автоматически" : "Вручную"}
                    </Button>
                </Form.Item>
                <Form.Item label="Выберите API">
                    <Radio.Group
                        defaultValue="binance"
                        buttonStyle="solid"
                        onChange={(e) => setSelectedApi(e.target.value)}
                    >
                        <Radio.Button value="binance">Binance</Radio.Button>
                        <Radio.Button value="gate">Gate</Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddCryptoForm;
