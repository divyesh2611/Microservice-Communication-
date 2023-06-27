module.exports = function makeGetEmployeeLocation({
  Joi,
  axios,
  satelize,
  Geolocation_Api_Key
}) {
  return async function makeGetEmployeeLocation({
    hostIp
  }) {

    console.log("ip", hostIp)

    validateInputDate({ hostIp });

    let latitude, longitude;
    satelize.satelize({ ip: hostIp }, (err, payload) => {
      latitude = payload.latitude;
      longitude = payload.longitude;
    })
    let location;
    await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=${Geolocation_Api_Key}&q=${latitude},${longitude}`)
      .then(response => {
        const { results } = response.data;
        if (results.length > 0) {
          const { formatted } = results[0];
          console.log('Location:', results[0].components.city);
          location = results[0].components.city;

        } else {
          console.log('No results found.');
        }
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
    return location;
  }
  function validateInputDate({ hostIp }) {
    const schema = Joi.object({
      hostIp: Joi.string().required()
    });
    const { error } = schema.validate({ hostIp });
    if (error) {
      console.log(error.details[0].message)
      throw new ValidationError(error.details[0].message);
    }
  }
}