// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require('axios');

function helper(data) {
  const { centers } = data;
  const finalData = [];
  try {
    centers.forEach(center => {
      const { sessions } = center;
      sessions.forEach(element => {
        if (element.available_capacity === 0 && element.min_age_limit === 18) {
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
  const config = {
    method: 'get',
    url: 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=294&date=03-05-2021',
    headers: {
      'authority': 'cdn-api.co-vin.in',
      'pragma': 'no-cache',
      'cache-control': 'no-cache',
      'accept': 'application/json, text/plain, */*',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36',
      'sec-gpc': '1',
      'origin': 'https://www.cowin.gov.in',
      'sec-fetch-site': 'cross-site',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'referer': 'https://www.cowin.gov.in/',
      'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
      'age': '18'
    }
  };

  try {
    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        const data = helper(response.data);
        res.status(200).json(JSON.stringify(data))
      })
      .catch(function (error) {
        res.status(500).json(JSON.stringify(error))
      });
  } catch (error) {
    // console.error(error);
    res.status(500).json(JSON.stringify(error))
  }


}
