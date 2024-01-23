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
import {Modal} from "antd";

function App() {
    const [data, setData] = useState<CryptoData[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const addCryptoData = (newData: Omit<CryptoData, 'key'>) => {
        const updatedData = {
            ...newData,
            key: Date.now(),
        };
        setData([...data, updatedData]);
        setIsModalVisible(false);
    };

    const onDelete = (key: number) => {
        setData(data.filter(item => item.key !== key));
    };

    return (
        <div className="App">
            <h1 className="main-title">CRYPTO BOARD</h1>
            <CoinPrice/>
            <ProfitTable cryptoData={data}/>
            <CryptoTable data={data} onDelete={onDelete}/>
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
