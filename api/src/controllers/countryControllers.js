const { Country, Activity } = require('../db.js')
const axios = require('axios')
const { Op } = require("sequelize");

const getCountries = async (req, res) => {
  const { name } = req.query;

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

     // En el primer llamado a la API la DB está vacía, por
    // lo cual chequeamos si la misma tiene datos o no,
    // y en consecuencia determinamos si debemos crear nuevos o no
    if (await Country.count() === 0) {
      await Country.bulkCreate(countries);
    }
    const includeActivityModel = [{
      model: Activity,
      attributes: ["name","difficulty","duration","season"],
      through: {
        attributes: { exclude: ["createdAt", "updatedAt"]},
      }
    }]
    // Caso contrario (si ya había datos en la DB), solicitamos aquellas filas
    // que queremos (todas o sólo las que matcheen con la query)
    const reqCountries = name 
    ? await Country.findAll({ where: { name: { [Op.match]: name }}, include: includeActivityModel }) 
    : await Country.findAll({ include: includeActivityModel })

    // Devolvemos ese resultado condicional
    res.json({ countries: reqCountries })
    // else res.status(404).json({ message: `No se encontraron resultados para "${name}"` })
  } catch (error) {
    res.status(500).json({ message:  error.message })
  }
}

const getOneCountry = async (req, res) => {

  const { countryId } = req.params;

  try {
    const data = await Country.findAll({
      where: {
        id: countryId
      },
      include: [{
        model: Activity,
        attributes: ["name","difficulty","duration","season"],
        through: {
          attributes: { exclude: ["createdAt", "updatedAt"] },
        }
      }],
    });

    const country = {
      id: data[0].id,
      name: data[0].name,
      imgFlag: data[0].imgFlag,
      continent: data[0].continent,
      capital: data[0].capital,
      subregion: data[0].subregion,
      area: data[0].area,
      population: data[0].population,
      activities: data[0].Activities
    }
    res.json({ country })
  } catch (error) {
    res.status(500).json({ mesage: error.message })
  }
}

module.exports = {
  getCountries,
  getOneCountry
};