import axios from "axios";

export const getAllCountries = (name = undefined) => axios(name
  ? `/countries?name=${name}`
  : `/countries`
);

export const getOneCountry = (countryId) => axios(`/countries/${countryId}`);