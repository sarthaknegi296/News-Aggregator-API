require("dotenv").config();
const { default: axios } = require("axios");
const User = require("../models/user");

const NEWS_API_KEY = process.env.NEWS_API_KEY;

const allowedCountries = ["us", "br", "in", "au", "ca", "de", "fr", "il", "jp", "cn", "pk", "ua", "gb"];
const allowedLanguages = ["en", "hi", "fr", "de", "ja", "ml", "mr", "uk", "te"];

const getNews = async (req, res) => {
  
  try {
    const username = req.user.username;
    const user = await User.findOne({ username: username });
    
    const language = user.preferances.language;
    
    const country = user.preferances.country;
    

    if(language && !allowedLanguages.includes(language)) {
      return res.status(400).json({
        message: "Invalid language",
      });
    }

    if(country && !allowedCountries.includes(country)) {
      return res.status(400).json({
        message: "Invalid country code",
      });
    }
    const url = `https://gnews.io/api/v4/search?q=example&lang=${language}&country=${country}&max=10&apikey=${NEWS_API_KEY}`;

    const response = await axios.get(url);

    return res.status(200).json({
      message: "News fetched successfully",
      news: response.data.articles,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error fetching news",
    });
  }
};

module.exports = {
  getNews,
};
