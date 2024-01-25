import axios from "axios";
import stockExchange from "../router/stockExchange";

export const fetchCurrentPrice = async (coinName: string) => {
    try {
        const response = await axios.get(stockExchange.BINANCE(coinName));
        return response.data.price || response.data.last;
    } catch (error) {
        console.error("Ошибка на Binance API:", error);
        try {
            const response = await axios.get(stockExchange.GATE(coinName));
            return response.data.price || response.data.last;
        } catch (error) {
            console.error("Ошибка на Gate.io API:", error);
            return null;
        }
    }
};