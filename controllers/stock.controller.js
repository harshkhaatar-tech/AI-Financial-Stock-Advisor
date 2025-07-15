const { fetchFundamentals } = require('../services/fundamentals.service');
const { fetchTechnicals } = require('../services/technical.service');
const { generateRecommendation } = require('../services/recommendation.service');

exports.getFundamentals = async (req, res) => {
  const { symbol } = req.params;
  console.log('yeah', symbol);
  try {
    console.log('yeah', symbol);
    const fundamentals = await fetchFundamentals(symbol);
    res.status(200).json(fundamentals);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching fundamentals' });
  }
}

exports.getTechnicals = async (req, res) => {
    const {symbol} = req.params;
    try {
        const technicals = await fetchTechnicals(symbol);
        res.status(200).json(technicals);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching technicals' });
    }
}

exports.getRecommendation = async (req, res) => {
    try {
      const fundamentals = await fetchFundamentals(req.params.symbol);
      const technicals = await fetchTechnicals(req.params.symbol);
      const advice = await generateRecommendation(fundamentals, technicals);
      res.json(advice);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };