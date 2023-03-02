const { Country, Activity } = require('../db.js')
const axios = require('axios')
const { Op } = require("sequelize");

const fetchCountries = async () => {
  try {
    const response = await axios('https://restcountries.com/v3/all')
    const countries = response.data.map(c => {
      return {
        id: c.cca3,
        name: c.name.common,
        imgFlag: c.flags[1],
        continent: c.continents[0],
        capital: c.capital ? c.capital[0] : c.capital,
        population: c.population,
        area: c.area,
        subregion: c.subregion  
      }
    })
    return countries;
  } catch (error) {
    throw new Error(error)
  }
}

const getCountries = async (req, res) => {
  const { name } = req.query;

  try {
    // En el primer llamado a la API la DB está vacía, por
    // lo cual chequeamos si la misma tiene datos o no,
    // y en consecuencia determinamos si debemos crear nuevos o no
    if (await Country.count() === 0) {
      const countries = await fetchCountries()
      await Country.bulkCreate(countries);
    }
    const includeActivityModel = [{
      model: Activity,
      through: { attributes: [] },
      as: "activities",
      attributes: { exclude: ["deletedAt", "updatedAt", "createdAt"] }
    }]
    // Caso contrario (si ya había datos en la DB), solicitamos aquellas filas
    // que queremos (todas o sólo las que matcheen con la query)
    const reqCountries = name 
    ? await Country.findAll({ where: { name: { [Op.match]: name }}, include: includeActivityModel }) 
    : await Country.findAll({ include: includeActivityModel })

    // Devolvemos ese resultado condicional
    res.status(200).json({ countries: reqCountries })
    // else res.status(404).json({ message: `No se encontraron resultados para "${name}"` })
  } catch (error) {
    res.status(500).json({ message:  error.message })
  }
}

const getOneCountry = async (req, res) => {
  const { countryId } = req.params;

  try {
    const country = await Country.findByPk(countryId, {
      include: [{
        model: Activity,
        attributes: { exclude: [ "createdAt", "deletedAt", "updatedAt" ] },
        through: { attributes: [] },
        as: "activities"
      }]
    });
  
    res.status(200).json(country)
  } catch (error) {
    res.status(500).json({ mesage: error.message })
  }
}

module.exports = {
  getCountries,
  getOneCountry
};