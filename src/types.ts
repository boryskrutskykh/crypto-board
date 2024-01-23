export interface CryptoData {
    key?: number;
    coin: string;
    volume: string;
    buyPrice?: string;
    currentPrice?: string;
    amount: string;
    price?: string;
    profit?: string;
    percentage?: string;
    onDelete: (key: number) => void;
}
