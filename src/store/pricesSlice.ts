import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {AppDispatch} from './';

interface PricesState {
    data: Record<string, string>;
    loading: boolean;
}

const initialState: PricesState = {
    data: {BTC: '', ETH: '', BNB: ''},
    loading: false,
};

export const pricesSlice = createSlice({
    name: 'prices',
    initialState,
    reducers: {
        fetchStart: state => {
            state.loading = true;
        },
        fetchSuccess: (state, action: PayloadAction<Record<string, string>>) => {
            state.data = action.payload;
            state.loading = false;
        },
        fetchFailure: state => {
            state.loading = false;
        },
    },
});

export const {fetchStart, fetchSuccess, fetchFailure} = pricesSlice.actions;

export const fetchPrices = () => async (dispatch: AppDispatch) => {
    dispatch(fetchStart());
    try {
        const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT'];
        const responses = await Promise.all(
            symbols.map(symbol =>
                axios.get(`https://www.binance.com/api/v3/ticker/price?symbol=${symbol}`)
            )
        );
        const prices = responses.reduce((acc: Record<string, string>, response, index) => {
            const symbol = symbols[index].slice(0, -4);
            acc[symbol] = Math.floor(response.data.price).toString(); // Преобразование числа в строку
            return acc;
        }, {} as Record<string, string>);
        dispatch(fetchSuccess(prices));
    } catch (error) {
        console.error(`Ошибка при получении данных:`, error);
        dispatch(fetchFailure());
    }
};


export default pricesSlice.reducer;
