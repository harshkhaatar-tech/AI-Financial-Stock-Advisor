const OpenAI = require('openai');

// Instantiate the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateRecommendation = async (fundamentals, technicals) => {
  const prompt = `
You are a professional financial advisor with an experience of 20+ years in financial markets.
Who provides detailed stock recommendations based on both fundamental and technical analysis.

Analyze this stock based on the given data:

### Fundamentals:
- Company: ${fundamentals.companyName}
- Sector: ${fundamentals.sector}
- P/E Ratio: ${fundamentals.peRatio}
- EPS: ${fundamentals.eps}
- ROE: ${fundamentals.roe}
- Debt/Equity: ${fundamentals.debtEquity}
- Market Cap: ${fundamentals.marketCap}
- Analyst Target Price: ${fundamentals.analystTargetPrice}
- Profit Margin: ${fundamentals.profitMargin}
- Description: ${fundamentals.description}

### Technicals:
- Latest Close: ${technicals.latestClose}
- RSI 14: ${technicals.rsi14}
- SMA 14: ${technicals.sma14}
- EMA 14: ${technicals.ema14}
- Trend: ${technicals.trend}
- MACD: ${technicals.macd}

### Instruction:
Based on fundamentals and technicals, generate a professional buy/sell/hold recommendation for short-term and long-term investors Separately. Mention strengths and risks.
Also, provide a brief explanation of your recommendation, including any relevant indicators or patterns observed in the technical analysis.
Make sure to provide a detailed analysis that can be understood by both novice and experienced investors.
### Format:
- **Short-term Recommendation**: [Buy/Sell/Hold]
- **Short-term Analysis**: [Your analysis here]
- **Short-term target price/stoploss**: [Your target price for the next 3-6 months]
- **Long-term Recommendation**: [Buy/Sell/Hold]
- **Long-term Analysis**: [Your analysis here]
- **Long-term target price/stoploss**: [Your target price for the next 1-2 years]
- **Strengths**: [List of strengths]
- **Risks**: [List of risks]
- **Conclusion**: [Your final thoughts on the stock]

Your Answer:
`;

  const res = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    prompt,
    temperature: 0.7,
    max_tokens: 3000,
  });

  return {
    recommendation: res.choices[0].message.content.trim(),
  };
};
