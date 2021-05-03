// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require('axios');
const moment = require('moment');

function helper(data) {
  const { centers } = data;
  const finalData = [];
  try {
    centers.forEach(center => {
      const { sessions } = center;
      sessions.forEach(element => {
        if (element.available_capacity > 0 && element.min_age_limit === 18) {
          let dataRequired = {
            centerName: '',
            available_capacity: 0,
            min_age_limit: 18,
            vaccine: '',
            date: ''
          }
          dataRequired.centerName = center.name;
          dataRequired.available_capacity = element.available_capacity
          dataRequired.min_age_limit = element.min_age_limit
          dataRequired.date = element.date;
          finalData.push(dataRequired)
        }
      });
    });
  } catch (error) {
    console.error(error)
  }

  return finalData;
}

export default (req, res) => {
  const { districtId = 294 } = req.query;
  const date = moment().format('DD-MM-YYYY');
  const config = {
    method: 'get',
    url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtId}&date=${date}`,
    headers: {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "sec-gpc": "1"
    },
  };


  try {
    axios(config)
      .then(function (response) {
        const data = helper(response.data);
        res.status(200).json(JSON.stringify(data))
      })
      .catch(function (error) {
        res.status(500).json(JSON.stringify(error))
      });
  } catch (error) {
    res.status(500).json(JSON.stringify(error))
  }


}
