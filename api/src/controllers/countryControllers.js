const { Country, Activity } = require('../db.js')
const axios = require('axios')

const getCountries = async (req, res) => {

  const { name } = req.query;

  try {
    const response = await axios(name 
      ? `https://restcountries.com/v3/name/${name}` 
      : 'https://restcountries.com/v3/all'
    )

    const countries = response.data.map(c => {
      return {
        id: c.cca3,
        name: c.name.common,
        imgFlag: c.flags[1],
        continent: c.continents[0]
      }
    })

    // En el primer llamado a la API la DB está vacía, por
    // lo cual chequeamos si la misma ya se llenó o no,
    // y en consecuencia determinamos si creamos o no nuevos datos
    const getCountriesDB = await Country.findAll();
    if (!getCountriesDB.length) {
      await Country.bulkCreate(countries);
    }

    res.json({ countries })
  } catch (error) {
    const { data: { status, message } } = error.response;
    throw new Error(`Error ${status}, ${message}`)
  }
}

const getOneCountry = async (req, res) => {

  const { countryId } = req.params;

  try {
    // const { data } = await axios(`https://restcountries.com/v3/alpha/${countryId}`)
    const data = await Country.findAll({
      where: {
        id: countryId
      },
      include:[{
        model: Activity,
        attributes: ["name","difficulty","duration","season"],
        through:{
          attributes: {exclude: ["createdAt", "updatedAt"]},
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
    // const { data: { status, message } } = error.response;
    throw new Error(error)
  }
}

module.exports = {
  getCountries,
  getOneCountry
};