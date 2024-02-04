import React, { useEffect, useState } from "react";
import "antd/dist/reset.css";
import "./styles/global.css";
import CryptoTable from "./components/Tables/CryptoTable";
import AddCryptoForm from "./components/Form/AddCryptoForm";
import { CryptoData } from "./types";
import AddButton from "./components/Button/AddButton";
import CoinPrice from "./components/General/CoinPrice";
import ProfitTable from "./components/Tables/ProfitTable";
import Footer from "./components/Footer/Footer";
import { Modal } from "antd";
import axios from "axios";
import { basicAuth } from "./api/auth";

function App() {
  const [data, setData] = useState<CryptoData[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // TODO move this piece of code to hooks.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/coins`, {
          headers: {
            'Authorization': `Basic ${basicAuth}`,
            'Content-type': 'application/json',
          }
        });
        setData(response.data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };
    fetchData();
  }, []);


  const addCryptoData = (newData: Omit<CryptoData, "key">) => {
    const updatedData = {
      ...newData,
      key: Date.now()
    };
    setData([...data, updatedData]);
    setIsModalVisible(false);
  };

  const onDeleteConfirm = (key: number) => {
    Modal.confirm({
      title: "Вы уверены, что хотите удалить эту монету?",
      onOk() {
        onDelete(key);
      }
    });
  };

  const onDelete = (key: number) => {
    setData(currentData => currentData.filter(item => item.key !== key));
  };

  const saveChanges = (updatedRecord: CryptoData) => {
    const newData = data.map((item) =>
      item.key === updatedRecord.key ? { ...updatedRecord, ...recalculateValues(updatedRecord) } : item
    );
    setData(newData);
  };

  const recalculateValues = (record: CryptoData) => {
    const updatedValues: Partial<CryptoData> = {};

    const amount = record.amount !== undefined ? parseFloat(record.amount) : undefined;
    const currentPrice = record.currentPrice !== undefined ? parseFloat(record.currentPrice) : undefined;
    const volume = record.volume !== undefined ? parseFloat(record.volume) : undefined;

    if (amount !== undefined && currentPrice !== undefined && volume !== undefined) {
      const newPrice = amount * currentPrice;
      const newProfit = newPrice - volume;
      const newAveragePrice = volume / amount;
      const newPercentage = (newProfit / volume) * 100;

      updatedValues.price = newPrice.toFixed(2);
      updatedValues.profit = `${newProfit.toFixed(2)} $`;
      updatedValues.averagePrice = newAveragePrice.toFixed(2);
      updatedValues.percentage = `${newPercentage.toFixed(2)} %`;
    }

    return updatedValues;
  };


  return (
    <div className="App">
      <h1 className="main-title">CRYPTOBOARD</h1>
      <CoinPrice />
      <ProfitTable cryptoData={data} />
      <CryptoTable data={data} onDeleteConfirm={onDeleteConfirm} onSave={saveChanges}
      />
      <AddButton showModal={() => setIsModalVisible(true)} />
      <AddCryptoForm
        onAdd={addCryptoData}
        isVisible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
      />
      <Footer />
    </div>
  );
}

export default App;
