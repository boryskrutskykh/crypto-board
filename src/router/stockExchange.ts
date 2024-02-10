export default {
    BINANCE: (coinName: string) => `https://www.binance.com/api/v3/ticker/price?symbol=${coinName}USDT`,
    GATE: (coinName: string) => `https://data.gateapi.io/api2/1/ticker/${coinName.toLowerCase()}_usdt`
}