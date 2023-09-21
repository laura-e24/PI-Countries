import axios from "axios";

export const getAllCountries = async (name = undefined) => await axios(name
  ? `/countries?name=${name}`
  : `/countries`
);

export const getOneCountry = async (countryId) => await axios(`/countries/${countryId}`);