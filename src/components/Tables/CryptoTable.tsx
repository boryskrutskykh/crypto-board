import React, { useEffect, useState } from "react";
import { Table, Form, Button, Modal } from "antd";
import styles from "./CryptoTable.module.css";
import { CryptoData } from "../../types";
import DeleteButton from "../Button/DeleteButton";
import EditableCell from "../../components/Tables/EditableCell";
import { EditOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { fetchCurrentPrice } from "../../api/fetchPrice";
import axios from "axios";
import {
  calculateAveragePrice,
  calculateTotalCost,
  calculateProfit,
  calculatePercentage
} from "../../utils/calculation";

interface CryptoTableProps {
  data: CryptoData[];
  onDeleteConfirm: (key: number) => void;
  onSave: (updatedRecord: CryptoData) => void;
}

const CryptoTable: React.FC<CryptoTableProps> = ({ data, onDeleteConfirm, onSave }) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [dataSource, setDataSource] = useState<CryptoData[]>(data);

  useEffect(() => {
    const updatePrices = async () => {
      const updatedData = await Promise.all(data.map(async (item) => {
        try {
          const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${item.coin}USDT`);
          const price = parseFloat(response.data.price).toFixed(2);
          const totalCost = calculateTotalCost(Number(item.amount), parseFloat(price));
          const profit = calculateProfit(totalCost, Number(item.volume));
          const percentage = calculatePercentage(profit, Number(item.volume));
          const averagePrice = calculateAveragePrice(Number(item.volume), Number(item.amount));

          return {
            ...item,
            currentPrice: price,
            price: totalCost.toString(),
            profit: `${profit.toFixed(2)} $`,
            percentage: percentage.toFixed(2),
            averagePrice: averagePrice
          };
        } catch (error) {
          console.error(`Ошибка при получении цены для ${item.coin}:`, error);
          return { ...item, currentPrice: "Ошибка" };
        }
      }));

      setDataSource(updatedData);
    };

    updatePrices();
  }, [data]);

  const isEditing = (record: CryptoData) => record.key === editingKey;

  const edit = (record: CryptoData) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key ?? null);
  };

  const updatePrice = async (item: CryptoData, row: CryptoData) => {
    if (isNaN(Number(row.currentPrice))) {
      const fetchedPrice = await fetchCurrentPrice(row.currentPrice ?? "");
      if (!fetchedPrice) {
        form.setFields([{ name: "currentPrice", errors: ["Монета не найдена на бирже"] }]);
        throw new Error("Цена не найдена");
      }
      return fetchedPrice.toString();
    }
    return Number(row.currentPrice).toString();
  };

  const save = async (key: React.Key) => {
    try {
      const row = await form.validateFields();
      const index = data.findIndex((item) => item.key === key);
      if (index === -1) return;

      const updatedItem = { ...data[index], ...row };
      updatedItem.currentPrice = await updatePrice(data[index], row);

      const newData = [...data];
      newData[index] = updatedItem;
      onSave(newData[index]);
      setEditingKey(null);
    } catch (errInfo) {
      console.error("Ошибка валидации:", errInfo);
    }
  };

  const columns = [
    {
      title: "Монета",
      dataIndex: "coin",
      key: "coin"
    },
    {
      title: "Объем $",
      dataIndex: "volume",
      key: "volume",
      sorter: (a: CryptoData, b: CryptoData) => parseFloat(a.volume) - parseFloat(b.volume),
      render: (text: string) => `${parseFloat(text).toFixed(2)} $`,
      editable: true
    },
    {
      title: "Средняя цена покупки",
      dataIndex: "averagePrice",
      key: "averagePrice"
    },
    {
      title: "Цена текущая",
      dataIndex: "currentPrice",
      key: "currentPrice",
      editable: true
    },
    {
      title: "Количество",
      dataIndex: "amount",
      key: "amount",
      editable: true
    },
    {
      title: "Стоимость",
      dataIndex: "price",
      key: "price",
      sorter: (a: CryptoData, b: CryptoData) => {
        const priceA = a.price ? parseFloat(a.price) : 0;
        const priceB = b.price ? parseFloat(b.price) : 0;
        return priceA - priceB;
      },
      render: (text: string) => `${parseFloat(text).toFixed(2)} $`
    },
    {
      title: "Прибыль",
      dataIndex: "profit",
      key: "profit",
      sorter: (a: CryptoData, b: CryptoData) => {
        const profitA = a.profit ? parseFloat(a.profit) : 0;
        const profitB = b.profit ? parseFloat(b.profit) : 0;
        return profitA - profitB;
      },
      render: (text: string) => {
        const profit = parseFloat(text);
        return <span style={{ color: profit < 0 ? "red" : "green" }}><b>{text}</b></span>;
      }
    },
    {
      title: "Процент",
      dataIndex: "percentage",
      key: "percentage",
      sorter: (a: CryptoData, b: CryptoData) => {
        const percentageA = a.percentage ? parseFloat(a.percentage) : 0;
        const percentageB = b.percentage ? parseFloat(b.percentage) : 0;
        return percentageA - percentageB;
      },
      render: (text: string) => {
        const percentage = parseFloat(text);
        return <span style={{ color: percentage < 0 ? "red" : "green" }}><b>{Number(text).toFixed(2)} %</b></span>;
      }
    },
    {
      key: "action",
      render: (_: any, record: CryptoData) => (
        <DeleteButton keyToDelete={record.id ?? 0} onDeleteConfirm={onDeleteConfirm} />
      )
    },
    {
      key: "action",
      render: (_: any, record: CryptoData) => {
        const editable = isEditing(record);
        return editable ? (
          <span style={{ display: "flex" }}>
        <button
          onClick={() => record.key !== undefined && save(record.key)}
          style={{ marginRight: 8, background: "#0dff00" }}
          className={styles.buttonStyle}
        >
            <CheckOutlined />
        </button>
        <button
          onClick={() => setEditingKey(null)}
          style={{ background: "#ff4d4f" }}
          className={styles.buttonStyle}
        >
            <CloseOutlined />
        </button>
    </span>
        ) : (
          <button
            disabled={editingKey !== null}
            onClick={() => edit(record)}
            className={styles.buttonStyle}
          >
            <EditOutlined />
          </button>
        );
      }
    }
  ];


  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: CryptoData) => ({
        record,
        inputtype: col.dataIndex === "volume" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    };
  });


  return (
    <div className={styles.tableContainer}>

      <h2>Список моих монет:</h2>
      <br />
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell
            }
          }}
          bordered
          dataSource={dataSource.map((record) => ({ ...record, key: record.id }))}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
        />
      </Form>
    </div>
  );
};

export default CryptoTable;
