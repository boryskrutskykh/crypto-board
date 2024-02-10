export interface CryptoData {
    id: number,
    key?: number;
    coin: string;
    volume: string;
    averagePrice?: string;
    currentPrice?: string;
    amount: string;
    price?: string;
    profit?: string;
    percentage?: string;
    onDelete: (key: number) => void;
}
