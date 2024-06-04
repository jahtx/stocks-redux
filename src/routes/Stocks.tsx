import React, { useEffect, useState } from 'react';
import DefaultLayout from 'layouts/default/DefaultLayout';
import { Tab, Tabs, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchStockInfo } from 'store/stocksSlice';
import { RootState, AppDispatch } from 'store/store';
import { format } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/styles.scss';

// Helper function to format the market capitalization
const formatMarketCap = (marketCap: string): string => {
  if (!marketCap) return 'N/A';

  // Remove any non-numeric characters (e.g., commas)
  const num = parseFloat(marketCap.replace(/[^0-9.-]+/g, ''));

  if (isNaN(num)) {
    return 'N/A';
  }

  if (num >= 1e12) {
    return `$${(num / 1e12).toFixed(2)}T`;
  } else if (num >= 1e9) {
    return `$${(num / 1e9).toFixed(2)}B`;
  } else if (num >= 1e6) {
    return `$${(num / 1e6).toFixed(2)}M`;
  } else {
    return `$${num.toFixed(2)}`;
  }
};

// Helper function to format dates
const formatDate = (date: string): string => {
  const parsedDate = new Date(date);
  return format(parsedDate, 'yy-MM-dd h:mmaaa');
};

const Stocks: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, lastUpdated, loading, error } = useSelector(
    (state: RootState) => state.stocks,
  );

  const [sortMethod, setSortMethod] = useState('marketCap');

  useEffect(() => {
    const symbols = [
      'AAPL',
      'GOOGL',
      'MSFT',
      'AMZN',
      'META',
      'NVDA',
      'TSLA',
      'NFLX',
      'AMD',
      'INTC',
      'PYPL',
      'CRM',
      'ADBE',
      'ORCL',
      'ZM',
    ];

    dispatch(fetchStockInfo(symbols));
  }, [dispatch]);

  const containerCSS = 'homemade-container-sm mx-auto w-100 d-flex flex-column';

  const sortedData = Object.entries(data).sort((a, b) => {
    if (sortMethod === 'marketCap') {
      const marketCapA =
        parseFloat(a[1].MarketCapitalization.replace(/[^0-9.-]+/g, '')) || 0;
      const marketCapB =
        parseFloat(b[1].MarketCapitalization.replace(/[^0-9.-]+/g, '')) || 0;
      return marketCapB - marketCapA;
    } else {
      return a[1].Name.localeCompare(b[1].Name);
    }
  });

  return (
    <DefaultLayout>
      <div className={containerCSS}>
        <Helmet>
          <html lang="en" />
          <title>Stocks</title>
          <meta name="description" content="Basic example" />
        </Helmet>
        <h1>Stocks</h1>
        {loading && (
          <div className="m-auto">
            <Spinner animation="border" role="status" className="my-3">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {error && <p>Error: {error}</p>}
        <Tabs
          id="stock-sort-tabs"
          activeKey={sortMethod}
          onSelect={(k) => setSortMethod(k || 'marketCap')}
          className="mb-3"
        >
          <Tab eventKey="marketCap" title="Sort by Market Cap">
            <div className="d-flex flex-wrap">
              {sortedData.map(([symbol, info]) => {
                const priceChange =
                  parseFloat(info.ChangePercent.replace(/[^0-9.-]+/g, '')) || 0;
                const isPositive = priceChange >= 0;

                return (
                  <div
                    key={symbol}
                    className="card custom-card position-relative"
                  >
                    <div
                      className={`circle-indicator ${
                        isPositive ? 'positive' : 'negative'
                      }`}
                    ></div>
                    <div className="card-body">
                      <h5 className="card-title">{symbol}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {info.Name}
                      </h6>
                      <p className="card-text">
                        <strong>Market Cap:</strong>{' '}
                        {formatMarketCap(info.MarketCapitalization)}
                        <br />
                        <strong>Stock Price:</strong> {info.CurrentPrice}
                        <br />
                        {lastUpdated[symbol] && (
                          <small className="text-muted">
                            Last updated: {formatDate(lastUpdated[symbol])}
                          </small>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Tab>
          <Tab eventKey="alphabetical" title="Sort Alphabetically">
            <div className="d-flex flex-wrap">
              {sortedData.map(([symbol, info]) => {
                const priceChange =
                  parseFloat(info.ChangePercent.replace(/[^0-9.-]+/g, '')) || 0;
                const isPositive = priceChange >= 0;

                return (
                  <div
                    key={symbol}
                    className="card custom-card position-relative"
                  >
                    <div
                      className={`circle-indicator ${
                        isPositive ? 'positive' : 'negative'
                      }`}
                    ></div>
                    <div className="card-body">
                      <h5 className="card-title">{symbol}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {info.Name}
                      </h6>
                      <p className="card-text">
                        <strong>Market Cap:</strong>{' '}
                        {formatMarketCap(info.MarketCapitalization)}
                        <br />
                        <strong>Stock Price:</strong>{' '}
                        {info['50DayMovingAverage']}
                        <br />
                        {lastUpdated[symbol] && (
                          <small className="text-muted">
                            Last updated: {formatDate(lastUpdated[symbol])}
                          </small>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Tab>
        </Tabs>
      </div>
    </DefaultLayout>
  );
};

export default Stocks;
