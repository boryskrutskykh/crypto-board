import React, { useState } from "react";
import { Modal, Input, Form, Button } from "antd";
import { CryptoData } from "../../types";
import axios from "axios";
import { Radio } from "antd";
import stockExchange from "../../router/stockExchange";
import styles from "./AddCryptoForm.module.css";
import { basicAuth } from "../../api/auth";

interface AddCryptoFormProps {
  onAdd: (newData: Omit<CryptoData, "key">) => void;
  isVisible: boolean;
  onCancel: () => void;
}

const AddCryptoForm = ({ onAdd, isVisible, onCancel }: AddCryptoFormProps) => {
  const [form] = Form.useForm();
  const [selectedApi, setSelectedApi] = useState("binance");
  const [manualCurrentPrice, setManualCurrentPrice] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleManualCurrentPrice = () => {
    setManualCurrentPrice(!manualCurrentPrice);
    form.resetFields(["currentPrice", "priceUrl"]);
  };

  const validateNumberInput = async (_: any, value: string) => {
    if (!value || /^\d+(\.\d+)?$/.test(value)) {
      return;
    }
    throw new Error("Пожалуйста, введите целое число или число с плавающей запятой");
  };

  const fetchCurrentPrice = async (coinName: string) => {
    let url;
    switch (selectedApi) {
      case "binance":
        url = stockExchange.BINANCE(coinName);
        break;
      case "gate":
        url = stockExchange.GATE(coinName);
        break;
      default:
        url = stockExchange.BINANCE(coinName);
    }
    try {
      const response = await axios.get(url);
      console.log(response.data);
      return response.data.price || response.data.last;
    } catch (error) {
      console.error("Ошибка при получении цены:", error);
      return null;
    }
  };


  const calculateAveragePrice = (volume: number, amount: number): string => {
    return volume && amount ? (volume / amount).toFixed(2) : "0";
  };

  const handleSubmit = async (values: any) => {
    setIsLoading(true);

    let currentPrice;

    if (!manualCurrentPrice) {
      try {
        currentPrice = await fetchCurrentPrice(values.priceUrl);
      } catch (error) {
        console.error("Ошибка при получении цены:", error);
        setIsLoading(false);
        return;
      }
    } else {
      currentPrice = values.currentPrice;
    }

    const totalCost = Number(values.amount) * (currentPrice || 0);
    const profit = totalCost - Number(values.volume);
    const percentage = Number(values.volume) !== 0 ? (profit * 100) / Number(values.volume) : 0;


    const newData = {
      ...values,
      currentPrice: currentPrice || "Цена не найдена",
      averagePrice: calculateAveragePrice(Number(values.volume), Number(values.amount)),
      price: Number(values.amount) * (currentPrice || 0),
      profit,
      percentage: Number(percentage).toFixed(2)
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/coins`, newData, {
        headers: {
          'Authorization': `Basic ${basicAuth}`,
        }
      });
      onAdd(response.data);
    } catch (error) {
      console.error(`Ошибка при добавлении монеты: ${error}`);
    }

    form.resetFields();
    setIsLoading(false);
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
          rules={[{ required: true, message: "Пожалуйста, введите название монеты" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="volume"
          label="Объем"
          rules={[{ validator: validateNumberInput }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="amount"
          label="Количество монет"
          rules={[{ validator: validateNumberInput }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="currentPrice"
          label="Цена текущая"
          rules={[
            {
              required: manualCurrentPrice,
              message: "Введите текущую цену"
            },
            {
              pattern: new RegExp(/^\d+(\.\d+)?$/),
              message: "Введите валидное число (разрешены десятичные числа)"
            }
          ]}
          hidden={!manualCurrentPrice}
        >
          <Input disabled={!manualCurrentPrice} />
        </Form.Item>
        <Form.Item
          name="priceUrl"
          label="Название монеты для получения цены"
          rules={[{ required: !manualCurrentPrice, message: "Пожалуйста, введите название монеты." }]}
          hidden={manualCurrentPrice}
        >
          <Input disabled={manualCurrentPrice} />
        </Form.Item>
        <Form.Item>
          <Button onClick={toggleManualCurrentPrice}>
            {manualCurrentPrice ? "Авто" : "Вручную"}
          </Button>
          {!manualCurrentPrice && (
            <Radio.Group
              style={{ marginLeft: "4%" }}
              defaultValue="binance"
              buttonStyle="solid"
              onChange={(e) => setSelectedApi(e.target.value)}
            >
              <Radio.Button value="binance">Binance</Radio.Button>
              <Radio.Button value="gate">Gate</Radio.Button>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item>
          <div className={styles.createButtons}>
            <Button key="back" onClick={onCancel}>
              Отмена
            </Button>
            <Button style={{ marginLeft: "3%" }} key="submit" type="primary" htmlType="submit"
                    loading={isLoading}>
              Добавить
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCryptoForm;
