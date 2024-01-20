import React, {useState} from 'react';
import 'antd/dist/reset.css';
import './styles/global.css';
import CryptoTable from './components/CryptoTable';
import AddCryptoForm from './components/AddCryptoForm';
import {CryptoData} from "./types";
import AddButton from './components/AddButton';
import CoinPrice from "./components/CoinPrice";


function App() {
    const [data, setData] = useState<CryptoData[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);


    const addCryptoData = (newData: Omit<CryptoData, 'key'>) => {
        setData([...data, {...newData, key: Date.now()}]);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    return (
        <div className="App">
            <h1 className="main-title" >CRYPTO BOARD</h1>
            <CoinPrice/>
            <CryptoTable data={data}/>
            <AddButton showModal={() => setIsModalVisible(true)} />
            <AddCryptoForm
                onAdd={addCryptoData}
                isVisible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
            />
        </div>
    );
}

export default App;
