/* eslint-disable no-restricted-globals */
let Geocoder;
export default Geocoder = {
  apiKey: null,
  options: {},

  init(apiKey, options = {}) {
    this.apiKey = apiKey;
    this.options = options;
  },

  get isInit() {
    return !!this.apiKey;
  },

  async from(...params) {
    if (!Geocoder.isInit) {
      throw new Error("Geocoder isn't initialized. Call Geocoder.init function (only once), passing it your app's api key as parameter.");
    }

    let queryParams;

    // (latitude, longitude)
    if (!isNaN(params[0]) && !isNaN(params[1])) queryParams = { latlng: `${params[0]},${params[1]}` };

    // [latitude, longitude]
    else if (params[0] instanceof Array) queryParams = { latlng: `${params[0][0]},${params[0][1]}` };

    // {latitude, longitude}  or {lat, lng}
    else if (params[0] instanceof Object) queryParams = { latlng: `${params[0].lat || params[0].latitude},${params[0].lng || params[0].longitude}` };

    // address
    else if (typeof params[0] === 'string') queryParams = { address: params[0] };

    // check query params
    if (!queryParams) {
      throw new Error(`Invalid parameters : \n${JSON.stringify(params, null, 2)}`);
    }

    queryParams = { key: this.apiKey, ...this.options, ...queryParams };
    // build url
    const url = `https://maps.google.com/maps/api/geocode/json?${toQueryParams(queryParams)}`;

    let response; let
      data;

    // fetch
    try {
      response = await fetch(url);
    } catch (error) {
      throw new Error('Error while fetching. Check your network.');
    }

    // parse
    try {
      data = await response.json();
    } catch (error) {
      throw new Error("Error while parsing response's body into JSON. The response is in the error's 'origin' field. Try to parse it yourself.");
    }

    // check response's data
    if (data.status !== 'OK') {
      throw new Error("Error from the server while geocoding. The received datas are in the error's 'origin' field. Check it for more informations.");
    }

    return data;
  },
};

function toQueryParams(object) {
  return Object.keys(object)
    .filter((key) => !!object[key])
    .map((key) => `${key}=${encodeURIComponent(object[key])}`)
    .join('&');
}
