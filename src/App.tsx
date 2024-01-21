import React, {useState} from 'react';
import 'antd/dist/reset.css';
import './styles/global.css';
import CryptoTable from './components/CryptoTable';
import AddCryptoForm from './components/AddCryptoForm';
import {CryptoData} from "./types";
import AddButton from './components/AddButton';
import CoinPrice from "./components/CoinPrice";
import ProfitTable from "./components/Tables/ProfitTable";
import Footer from "./components/Footer/Footer";

function App() {
    const [data, setData] = useState<CryptoData[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const calculateAveragePrice = (volume: number, amount: number): string => {
        return volume && amount ? (volume / amount).toFixed(2) : '0';
    };

    const addCryptoData = (newData: Omit<CryptoData, 'key'>) => {
        const updatedData = {
            ...newData,
            averagePrice: calculateAveragePrice(Number(newData.volume), Number(newData.amount)),
            key: Date.now(),
        };
        setData([...data, updatedData]);
        setIsModalVisible(false);
    };

    return (
        <div className="App">
            <h1 className="main-title">CRYPTO BOARD</h1>
            <CoinPrice/>
            <ProfitTable/>
            <CryptoTable data={data}/>
            <AddButton showModal={() => setIsModalVisible(true)}/>
            <AddCryptoForm
                onAdd={addCryptoData}
                isVisible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
            />
            <Footer/>
        </div>
    );
}

export default App;
