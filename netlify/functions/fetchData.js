require('dotenv').config();
const fetch = require('node-fetch');

exports.handler = async function () {
  const API_URL = 'https://per-pr.microcms.io/api/v1/portfolio';
  const API_KEY = process.env.MICROCMS_API_KEY;

  try {
    const response = await fetch(API_URL, {
      headers: { 'X-MICROCMS-API-KEY': API_KEY },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
