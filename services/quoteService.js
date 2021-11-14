import axios from 'axios';
import { FAVSQ_KEY } from '../constants/keys.js';

const root = async url => {
  url = 'https://favqs.com/api' + url;
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Token token="${FAVSQ_KEY}"` },
    });
    return { success: true, data: response.data };
  } catch (e) {
    console.log(e.response.status, e.response.data);
    console.log(e.message);
    return { success: false };
  }
};

const getQuoteOfTheDay = () => root(`/qotd`);

const getQuotes = () => root(`/quotes`);

const getQuoteById = id => root('/quotes/' + id);

export { getQuoteOfTheDay, getQuotes, getQuoteById };
