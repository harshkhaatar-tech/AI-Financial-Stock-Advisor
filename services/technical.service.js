const { alphaVantage } = require('../utils/apiClient');
const { SMA, EMA, MACD, RSI } = require('technicalindicators');

exports.fetchTechnicals = async (symbol) => {
    const response = await alphaVantage.get('',{
        params: {
            function: 'TIME_SERIES_DAILY',
            symbol: symbol.toUpperCase(),
            outputsize: 'compact', // this will get us the 100 days of data
        },
    })

    console.log('response', response);

    const raw = response && response.data && response.data['Time Series (Daily)'];
    // console.log('raw', raw);
    
    if (!raw) {
        throw new Error('No data found for the given symbol');
    }

    const prices = Object.entries(raw).map(([date, data]) => ({
        date,
        close: parseFloat(data['4. close']),
    }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const closes = prices.map(p => p.close);

    const sma14 = SMA.calculate({ period: 14, values: closes });
    const ema14 = EMA.calculate({ period: 14, values: closes });
    const rsi14 = RSI.calculate({ period: 14, values: closes });
    const macd = MACD.calculate({
        values: closes,
        fastPeriod: 12,
        slowPeriod: 26,
        signalPeriod: 9
    });

    return {
        symbol: symbol.toUpperCase(),
        sma14: sma14.at(-1),
        ema14: ema14.at(-1),
        rsi14: rsi14.at(-1),
        trend: rsi14.at(-1) > 70 ? 'Overbought'
            : rsi14.at(-1) < 30 ? 'Oversold'
                : 'Neutral',
        macd: macd.slice(-1)[0]
    };

};
