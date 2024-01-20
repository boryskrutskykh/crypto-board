import React from 'react';
import 'antd/dist/reset.css';
// import './App.css';
import './styles/global.css';
import CryptoTable from './components/CryptoTable';


function App() {
  return (
    <div className="App">
      <h1 className="main-title">Crypto Board</h1>
      <CryptoTable />
    </div>
  );
}

export default App;
