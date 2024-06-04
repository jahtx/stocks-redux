import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '5SMUFOOISI9EETAH';
const BASE_URL = 'https://www.alphavantage.co/query';

interface CompanyInfo {
  Name: string;
  MarketCapitalization: string;
  '50DayMovingAverage': string;
  ChangePercent: string;
  CurrentPrice: string;
}

interface StocksState {
  data: Record<string, CompanyInfo>;
  lastUpdated: Record<string, string>;
  loading: boolean;
  error: string | null;
}

const initialState: StocksState = {
  data: {},
  lastUpdated: {},
  loading: false,
  error: null,
};

export const fetchStockInfo = createAsyncThunk(
  'stocks/fetchStockInfo',
  async (symbols: string[]) => {
    const companyInfo: Record<string, CompanyInfo> = {};

    for (const symbol of symbols) {
      const overviewUrl = `${BASE_URL}?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`;
      const dailyUrl = `${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;

      try {
        const [overviewResponse, dailyResponse] = await Promise.all([
          axios.get(overviewUrl),
          axios.get(dailyUrl),
        ]);

        const overviewData = overviewResponse.data;
        const dailyData = dailyResponse.data['Time Series (Daily)'];

        const lastTwoDays = Object.keys(dailyData).slice(0, 2);
        const latestDay = dailyData[lastTwoDays[0]];
        const previousDay = dailyData[lastTwoDays[1]];

        const latestClose = parseFloat(latestDay['4. close']);
        const previousClose = parseFloat(previousDay['4. close']);

        const changePercent = (
          ((latestClose - previousClose) / previousClose) *
          100
        ).toFixed(2);

        companyInfo[symbol] = {
          ...overviewData,
          ChangePercent: changePercent + '%',
          CurrentPrice: latestClose.toFixed(2), // Include current price
        };
      } catch (error) {
        console.error(
          `Error fetching data for ${symbol}:`,
          (error as Error).message,
        );
      }
    }

    return companyInfo;
  },
);

const stocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStockInfo.fulfilled, (state, action) => {
        state.loading = false;
        const now = new Date().toISOString();
        Object.entries(action.payload).forEach(([symbol, info]) => {
          state.data[symbol] = info;
          state.lastUpdated[symbol] = now;
        });
      })
      .addCase(fetchStockInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch stock data';
      });
  },
});

export default stocksSlice.reducer;
