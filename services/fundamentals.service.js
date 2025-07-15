// services/fundamentals.service.js
const { alphaVantage } = require('../utils/apiClient');

exports.fetchFundamentals = async (symbol) => {
  const overview = await alphaVantage.get('', {
    params: {
      function: 'OVERVIEW',
      symbol: symbol.toUpperCase(),
    },
  });
  console.log('overview', overview);
  const data = overview.data;

  if (!data || Object.keys(data).length === 0) {
    throw new Error(`No data found for ${symbol}`);
  }

  return {
    data: data,
    companyName: data.Name,
    marketCap: data.MarketCapitalization,
    peRatio: data.PERatio,
    eps: data.EPS,
    roe: data.ReturnOnEquityTTM,
    debtEquity: data.DebtEquity,
    profitMargin: data.ProfitMargin,
    analystTargetPrice: data.AnalystTargetPrice,
    sector: data.Sector,
    description: data.Description,
  };
};
