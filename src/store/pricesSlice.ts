import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

interface PricesState {
    data: Record<string, string>;
    loading: boolean;
}

const initialState: PricesState = {
    data: {BTC: '', ETH: '', BNB: ''},
    loading: false,
};

export const fetchPrices = createAsyncThunk<Record<string, string>, void>(
    'prices/fetchPrices',
    async () => {
        const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT'];
        const responses = await Promise.all(
            symbols.map(symbol =>
                axios.get(`https://www.binance.com/api/v3/ticker/price?symbol=${symbol}`)
            )
        );
        return responses.reduce((acc, response, index) => {
            const symbol = symbols[index].slice(0, -4);
            acc[symbol] = Math.floor(response.data.price).toString();
            return acc;
        }, {} as Record<string, string>);
    }
);

const pricesSlice = createSlice({
    name: 'prices',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPrices.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchPrices.fulfilled, (state, action: PayloadAction<Record<string, string>>) => {
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchPrices.rejected, (state) => {
            state.loading = false;
            console.log('Something went wrong.')
        });
    },
});


export default pricesSlice.reducer;
