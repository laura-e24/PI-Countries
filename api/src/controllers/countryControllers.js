const { Country } = require('../db.js')
const axios = require('axios')

const getCountries = async (req, res) => {
  try {
    const response = await axios('https://restcountries.com/v3/all')
    const countries = response.data.map(c => {
      return {
        id: c.cca3,
        name: c.name.common,
        imgFlag: c.flags[1],
        continent: c.continents[0],
        capital: c.capital ? c.capital[0] : 'No capital.',
        subregion: c.subregion,
        area: c.area,
        population: c.population
      }
    })

    const country = await Country.bulkCreate(countries);
    res.json({ countries: country })
  } catch (error) {
    throw new Error(error)
  }
}

const getOneCountry = async (req, res) => {

}

module.exports = {
  getCountries,
  getOneCountry
};